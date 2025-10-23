import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileUp, Search, Plus, Brain, Sparkles } from 'lucide-react';
import { useCredentials, Credential } from '../contexts/CredentialsContext';
import CredentialCard from '../components/credentials/CredentialCard';
import AIInteraction from '../components/ai/AIInteraction';

const DashboardPage = () => {
  const { credentials, isLoading } = useCredentials();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // Filter credentials based on search term
  const filteredCredentials = credentials.filter(cred => 
    cred.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cred.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCredentialSelect = (credential: Credential) => {
    setSelectedCredential(credential);
    setShowAIModal(true);
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Credentials</h1>
            <p className="text-gray-600">
              Manage and verify your blockchain-secured learning credentials
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/upload" className="btn-primary flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add New Credential
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search credentials by name or issuer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Credentials Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredCredentials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredentials.map((credential) => (
              <CredentialCard 
                key={credential.id} 
                credential={credential} 
                onClick={() => handleCredentialSelect(credential)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FileUp className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No credentials found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 
                `No credentials matching "${searchTerm}". Try a different search term.` : 
                "You haven't uploaded any credentials yet. Get started by adding your first credential."}
            </p>
            {!searchTerm && (
              <Link to="/upload" className="btn-primary inline-flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add New Credential
              </Link>
            )}
          </div>
        )}

        {/* AI Features Promo */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="bg-white rounded-full p-4 shadow-md inline-flex">
                <Brain className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-700 mb-4">
                Click on any credential to interact with our AI. Ask questions, get summaries, and explore your learning materials in depth.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white rounded-full px-3 py-1 text-sm font-medium text-primary-600 shadow-sm flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Get summaries
                </div>
                <div className="bg-white rounded-full px-3 py-1 text-sm font-medium text-primary-600 shadow-sm flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Ask questions
                </div>
                <div className="bg-white rounded-full px-3 py-1 text-sm font-medium text-primary-600 shadow-sm flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Verify authenticity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Interaction Modal */}
      {showAIModal && selectedCredential && (
        <AIInteraction 
          credential={selectedCredential} 
          isOpen={showAIModal} 
          onClose={() => setShowAIModal(false)} 
        />
      )}
    </div>
  );
};

export default DashboardPage;