# Blockchain MD5 Hash Generator

A modern web application that generates MD5 hashes using a smart contract deployed on the Polygon blockchain.

## Features

- Generate MD5 hashes using blockchain technology
- Sleek dark-themed UI inspired by modern web applications
- Real-time hash generation from the deployed smart contract
- Copy-to-clipboard functionality for generated hashes
- Responsive design for all device sizes

## Technology Stack

- React.js for the frontend
- Ethers.js for blockchain interaction
- Styled Components for styling
- Smart Contract on Polygon Mainnet (Chain ID: 137)

## Setup & Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd md5-hash-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## Smart Contract

The application interacts with an MD5 hash generation smart contract deployed at:

- Contract Address: `0x88Fe00aB59cC3da7165640E30984308B30777A00`
- Network: Polygon Mainnet
- Chain ID: 137
- RPC URL: `https://polygon-rpc.com`

## Usage

1. Enter any text in the input field
2. Click the "Generate MD5 Hash" button
3. The application will call the smart contract to generate the hash
4. The resulting MD5 hash will be displayed below the input
5. Use the "Copy to Clipboard" button to copy the generated hash

## License

MIT 