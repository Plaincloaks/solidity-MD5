import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem 1rem;
  text-align: center;
  color: var(--text-secondary);
  background-color: var(--secondary-bg);
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  transition: color 0.2s;

  &:hover {
    color: var(--accent-color);
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="https://polygon.technology/" target="_blank" rel="noopener noreferrer">
            Polygon Network
          </FooterLink>
          <FooterLink href="https://www.md5hashgenerator.com/" target="_blank" rel="noopener noreferrer">
            Traditional MD5 Generator
          </FooterLink>
        </FooterLinks>
        <FooterText>
          Contract Address: 0x88Fe00aB59cC3da7165640E30984308B30777A00
        </FooterText>
        <FooterText>
          © {new Date().getFullYear()} MD5 Hash Generator
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 