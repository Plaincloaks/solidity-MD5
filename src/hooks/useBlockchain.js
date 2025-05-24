import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import config from '../config';
import MD5Abi from '../abis/MD5.json';

const useBlockchain = () => {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hash, setHash] = useState(null);

  useEffect(() => {
    try {
      // Initialize provider with the RPC URL
      const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      setProvider(provider);
      
      // Initialize contract
      const contract = new ethers.Contract(
        config.contractAddress,
        MD5Abi,
        provider
      );
      setContract(contract);
    } catch (err) {
      setError("Failed to connect to the blockchain. Please try again later.");
      console.error("Blockchain connection error:", err);
    }
  }, []);

  const generateHash = useCallback(async (input) => {
    if (!contract) return;
    
    setLoading(true);
    setError(null);
    setHash(null);
    
    try {
      // Call the stringMD5 function from the contract
      const result = await contract.stringMD5ToBytes32(input);
      
      // Convert the bytes32 result to a hex string without 0x prefix
      const hexString = ethers.utils.hexlify(result).substring(2);
      setHash(hexString);
    } catch (err) {
      setError("Failed to generate hash. Please try again.");
      console.error("Hash generation error:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  return {
    provider,
    contract,
    loading,
    error,
    hash,
    generateHash
  };
};

export default useBlockchain; 