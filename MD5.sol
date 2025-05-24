pragma solidity ^0.8.24;

contract MD5 {
    // Precomputed T values from the MD5 specification
    uint32[64] private T;
    // Shift amounts for each round
    uint8[64] private shifts;

    constructor() {
        // Initialize T values (truncated here; fill all 64 entries)
        T = [
            0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
            0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
            0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
            // Add remaining T values up to index 63
            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
            0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
            0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
            0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
            0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
            0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
            0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
            0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
            0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
            0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
        ];

        // Initialize shift amounts
        shifts = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
            5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20, 5,  9, 14, 20,
            4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
            6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
        ];
    }

    function stringMD5ToBytes32(string memory stringData) public view returns(bytes32) {
        return md5(bytes(stringData));
    }

    function md5(bytes memory data) public view returns (bytes32) {
        bytes memory padded = pad(data);
        uint a = 0x67452301;
        uint b = 0xefcdab89;
        uint c = 0x98badcfe;
        uint d = 0x10325476;

        for (uint i = 0; i < padded.length; i += 64) {
            bytes memory blockBytes = substring(padded, i, i + 64);
            uint[16] memory X = splitIntoWords(blockBytes);
            uint AA = a;
            uint BB = b;
            uint CC = c;
            uint DD = d;

            for (uint j = 0; j < 64; j++) {
                uint F;
                uint g;
                if (j < 16) {
                    F = (BB & CC) | ((~BB) & DD);
                    g = j;
                } else if (j < 32) {
                    F = (DD & BB) | ((~DD) & CC);
                    g = (5 * j + 1) % 16;
                } else if (j < 48) {
                    F = BB ^ CC ^ DD;
                    g = (3 * j + 5) % 16;
                } else {
                    F = CC ^ (BB | (~DD));
                    g = (7 * j) % 16;
                }
                F = F & 0xFFFFFFFF;

                uint temp = (F + AA + X[g] + T[j]) & 0xFFFFFFFF;
                temp = leftRotate(temp, shifts[j]);
                temp = (temp + BB) & 0xFFFFFFFF;

                // Rotate variables
                AA = DD;
                DD = CC;
                CC = BB;
                BB = temp;
            }

            a = (a + AA) & 0xFFFFFFFF;
            b = (b + BB) & 0xFFFFFFFF;
            c = (c + CC) & 0xFFFFFFFF;
            d = (d + DD) & 0xFFFFFFFF;
        }

        // Convert to little-endian bytes
        bytes memory hashBytes = new bytes(16);
        for (uint i = 0; i < 4; i++) {
            hashBytes[i]      = bytes1(uint8(a >> (i * 8)));
            hashBytes[i + 4]  = bytes1(uint8(b >> (i * 8)));
            hashBytes[i + 8]  = bytes1(uint8(c >> (i * 8)));
            hashBytes[i + 12] = bytes1(uint8(d >> (i * 8)));
        }

        bytes32 hash;
        assembly {
            hash := mload(add(hashBytes, 0x20))
        }
        return hash;
    }

    // Helper functions
    function pad(bytes memory data) internal pure returns (bytes memory) {
        uint len = data.length;
        uint bitLength = len * 8;
        uint requiredLength = len + 1 + 8;
        uint padLen = (64 - (requiredLength % 64)) % 64;
        uint paddedLength = requiredLength + padLen;
        bytes memory padded = new bytes(paddedLength);

        for (uint i = 0; i < len; i++) {
            padded[i] = data[i];
        }
        padded[len] = 0x80;

        for (uint i = 0; i < 8; i++) {
            padded[paddedLength - 8 + i] = bytes1(uint8(bitLength >> (i * 8)));
        }

        return padded;
    }

    function substring(bytes memory data, uint start, uint end) internal pure returns (bytes memory) {
        bytes memory result = new bytes(end - start);
        for (uint i = start; i < end; i++) {
            result[i - start] = data[i];
        }
        return result;
    }

    function splitIntoWords(bytes memory blockBytes) internal pure returns (uint[16] memory X) {
        for (uint i = 0; i < 16; i++) {
            uint index = i * 4;
            X[i] = 
                    uint(uint8(blockBytes[index])) |
                    (uint(uint8(blockBytes[index + 1])) << 8) |
                    (uint(uint8(blockBytes[index + 2])) << 16) |
                    (uint(uint8(blockBytes[index + 3])) << 24);
                
            X[i] = X[i] & 0xFFFFFFFF;
        }
    }

    function leftRotate(uint x, uint8 s) internal pure returns (uint) {
        return ((x << s) | (x >> (32 - s))) & 0xFFFFFFFF;
    }

}