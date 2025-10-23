import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { Wallet, LogOut } from 'lucide-react';

interface WalletConnectProps {
  isMobile?: boolean;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ isMobile = false }) => {
  const { address, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleConnect = async (e: React.MouseEvent) => {
    e.preventDefault();
    await connectWallet();
  };

  const handleDisconnect = (e: React.MouseEvent) => {
    e.preventDefault();
    disconnectWallet();
  };

  return (
    <div className={`${isMobile ? 'w-full' : ''}`}>
      {address ? (
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg">
            <Wallet className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{formatAddress(address)}</span>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`btn-primary flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;