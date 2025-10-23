import React, { createContext, useContext, useState } from 'react';

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  ipfsHash: string;
  tokenId?: string;
  summary?: string;
  previewUrl?: string;
}

interface CredentialsContextType {
  credentials: Credential[];
  addCredential: (credential: Credential) => void;
  getCredentialById: (id: string) => Credential | undefined;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const CredentialsContext = createContext<CredentialsContextType>({
  credentials: [],
  addCredential: () => {},
  getCredentialById: () => undefined,
  isLoading: false,
  setIsLoading: () => {},
});

export const useCredentials = () => useContext(CredentialsContext);

interface CredentialsProviderProps {
  children: React.ReactNode;
}

export const CredentialsProvider: React.FC<CredentialsProviderProps> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credential[]>([
    // Sample data for demonstration
    {
      id: '1',
      name: 'Introduction to Blockchain Technology',
      issuer: 'Blockchain Academy',
      issueDate: '2024-05-15',
      ipfsHash: 'QmXyZ123...',
      tokenId: '1',
      summary: 'This credential certifies completion of a comprehensive introduction to blockchain technology, covering distributed ledger concepts, consensus mechanisms, and basic cryptography.',
      previewUrl: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Advanced Machine Learning',
      issuer: 'AI Research Institute',
      issueDate: '2024-04-22',
      ipfsHash: 'QmAbc456...',
      tokenId: '2',
      summary: 'This credential verifies proficiency in advanced machine learning techniques including deep neural networks, reinforcement learning, and natural language processing applications.',
      previewUrl: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const addCredential = (credential: Credential) => {
    setCredentials([...credentials, credential]);
  };

  const getCredentialById = (id: string) => {
    return credentials.find(cred => cred.id === id);
  };

  return (
    <CredentialsContext.Provider value={{ 
      credentials, 
      addCredential, 
      getCredentialById,
      isLoading,
      setIsLoading
    }}>
      {children}
    </CredentialsContext.Provider>
  );
};