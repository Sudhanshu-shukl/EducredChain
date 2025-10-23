import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { address, isConnecting } = useWallet();

  if (isConnecting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-lg text-gray-600">Connecting to wallet...</p>
      </div>
    );
  }

  if (!address) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;