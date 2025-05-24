import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-bg: #0f0f17;
    --secondary-bg: #1a1a2e;
    --accent-color: #6c63ff;
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --error-color: #ff5757;
    --success-color: #4caf50;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--primary-bg);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #8278ff;
    }
  }

  button, input {
    font-family: inherit;
  }
`;

export default GlobalStyle; 