import React, { useState } from 'react';
import styled from 'styled-components';
import useBlockchain from '../hooks/useBlockchain';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

const Card = styled.div`
  background-color: var(--secondary-bg);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--text-primary);
  font-size: 1rem;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, var(--accent-color), #8278ff);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: var(--text-secondary);
`;

const FormatSelector = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.25rem;
  border: 1px solid #333;
`;

const FormatOption = styled.button`
  background: ${props => props.active ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: ${props => props.active ? 'white' : 'var(--accent-color)'};
  }
`;

const HashResult = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  letter-spacing: 1px;
  word-break: break-all;
  border: 1px solid #333;
  color: var(--accent-color);
  font-size: 1.1rem;
`;

const FormatInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
  text-align: center;
`;

const CopyButton = styled.button`
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  margin: 1rem auto 0 auto;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  display: block;

  &:hover {
    background-color: rgba(108, 99, 255, 0.1);
    color: var(--accent-color);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  background-color: rgba(255, 87, 87, 0.1);
  border: 1px solid rgba(255, 87, 87, 0.3);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
`;

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [copyText, setCopyText] = useState('Copy to Clipboard');
  const [hashFormat, setHashFormat] = useState('string'); // 'string' or 'bytes32'
  const { loading, error, hash, generateHash } = useBlockchain();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      generateHash(input);
    }
  };

  const getDisplayHash = () => {
    if (!hash) return '';
    
    if (hashFormat === 'string') {
      // Return first 32 characters (128 bits) without 0x prefix
      return hash.substring(0, 32);
    } else {
      // Return full hex with 0x prefix
      return `0x${hash}`;
    }
  };

  const handleCopy = () => {
    const displayHash = getDisplayHash();
    navigator.clipboard.writeText(displayHash);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy to Clipboard'), 2000);
  };

  const getFormatDescription = () => {
    if (hashFormat === 'string') {
      return 'MD5 String (128 bits / 32 characters)';
    } else {
      return 'Hex Bytes32 (256 bits with padding)';
    }
  };

  return (
    <Container>
      <Card>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="input-text">Enter text to generate MD5 hash</Label>
            <TextArea
              id="input-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste text here..."
              required
            />
          </InputGroup>
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading && <LoadingSpinner />}
            {loading ? 'Generating...' : 'Generate MD5 Hash'}
          </Button>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {hash && (
          <ResultContainer>
            <ResultHeader>
              <ResultTitle>MD5 Hash Result:</ResultTitle>
              <FormatSelector>
                <FormatOption 
                  active={hashFormat === 'string'}
                  onClick={() => setHashFormat('string')}
                  type="button"
                >
                  String
                </FormatOption>
                <FormatOption 
                  active={hashFormat === 'bytes32'}
                  onClick={() => setHashFormat('bytes32')}
                  type="button"
                >
                  Hex Bytes32
                </FormatOption>
              </FormatSelector>
            </ResultHeader>
            <HashResult>{getDisplayHash()}</HashResult>
            <FormatInfo>{getFormatDescription()}</FormatInfo>
            <CopyButton onClick={handleCopy}>{copyText}</CopyButton>
          </ResultContainer>
        )}
      </Card>
    </Container>
  );
};

export default HashGenerator; 