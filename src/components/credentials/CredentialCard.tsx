import React from 'react';
import { Shield, Calendar, Building, Brain } from 'lucide-react';
import { Credential } from '../../contexts/CredentialsContext';

interface CredentialCardProps {
  credential: Credential;
  onClick: () => void;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className="card hover:transform hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      {/* Credential Preview Image */}
      <div className="w-full h-40 rounded-lg overflow-hidden mb-4 relative">
        <img 
          src={credential.previewUrl || 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
          alt={credential.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-medium py-1 px-2 rounded-full flex items-center">
          <Shield className="w-3 h-3 mr-1" />
          Verified
        </div>
      </div>
      
      {/* Credential Info */}
      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
        {credential.name}
      </h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2 text-gray-400" />
          <span>{credential.issuer}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          <span>Issued on {formatDate(credential.issueDate)}</span>
        </div>
      </div>
      
      {/* Summary Preview */}
      <div className="border-t border-gray-100 pt-4 mt-auto">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {credential.summary || 'Click to view credential details and interact with AI.'}
        </p>
        <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          <Brain className="w-4 h-4 mr-1" />
          Ask AI about this credential
        </button>
      </div>
    </div>
  );
};

export default CredentialCard;