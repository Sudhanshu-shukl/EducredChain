import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';
import { WalletProvider } from './contexts/WalletContext';
import { CredentialsProvider } from './contexts/CredentialsContext';

// Mumbai testnet chainId
const activeChainId = 80001;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider activeChain={activeChainId}>
      <WalletProvider>
        <CredentialsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CredentialsProvider>
      </WalletProvider>
    </ThirdwebProvider>
  </StrictMode>
);