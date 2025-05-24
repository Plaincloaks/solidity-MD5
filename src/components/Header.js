import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background-color: var(--secondary-bg);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--accent-color), #ff6b95);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-secondary);
  text-align: center;
  max-width: 600px;
`;

const NetworkBadge = styled.div`
  display: inline-block;
  background-color: rgba(108, 99, 255, 0.2);
  color: var(--accent-color);
  padding: 0.4rem 0.8rem;
  border-radius: 16px;
  font-size: 0.85rem;
  margin-top: 1rem;
  border: 1px solid var(--accent-color);
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>MD5 Hash Generator</Title>
      <Subtitle>
        Cryptographic MD5 hash generation powered by smart contracts on the blockchain
      </Subtitle>
      <NetworkBadge>Polygon Mainnet</NetworkBadge>
    </HeaderContainer>
  );
};

export default Header; 