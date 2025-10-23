import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Check, FileText, Shield, AlertTriangle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useCredentials } from '../contexts/CredentialsContext';
import UploadSteps from '../components/upload/UploadSteps';
import CredentialForm from '../components/upload/CredentialForm';
import { uploadToIPFS } from '../services/ipfsService';
import { mintNFT } from '../services/web3Service';

interface CredentialFormData {
  name: string;
  issuer: string;
  issueDate: string;
}

const UploadPage = () => {
  const navigate = useNavigate();
  const { addCredential, setIsLoading } = useCredentials();
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<CredentialFormData>({
    name: '',
    issuer: '',
    issueDate: '',
  });
  const [ipfsHash, setIpfsHash] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setCurrentStep(2);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDropRejected: () => {
      setError('Please upload a valid PDF file.');
    },
  });

  const handleFormSubmit = async (data: CredentialFormData) => {
    setFormData(data);
    setCurrentStep(3);
    await processCredential(data);
  };

  const processCredential = async (data: CredentialFormData) => {
    if (!file) return;
    
    try {
      setIsProcessing(true);
      setIsLoading(true);
      
      // Upload to IPFS
      const hash = await uploadToIPFS(file);
      setIpfsHash(hash);
      
      // Mint NFT
      const id = await mintNFT({
        name: data.name,
        issuer: data.issuer,
        issueDate: data.issueDate,
        ipfsHash: hash,
      });
      setTokenId(id);
      
      // Add to credentials context
      const newCredential = {
        id: Date.now().toString(),
        name: data.name,
        issuer: data.issuer,
        issueDate: data.issueDate,
        ipfsHash: hash,
        tokenId: id,
        summary: 'This is an automatically generated summary of the credential content. It highlights key learning outcomes and achievements.',
        previewUrl: 'https://images.pexels.com/photos/5797908/pexels-photo-5797908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      };
      
      addCredential(newCredential);
      setCurrentStep(4);
    } catch (err) {
      console.error('Error processing credential:', err);
      setError('An error occurred while processing your credential. Please try again.');
      setCurrentStep(2);
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Credential</h1>
            <p className="text-gray-600">
              Upload your learning credential to verify and secure it on the blockchain
            </p>
          </div>

          <UploadSteps currentStep={currentStep} />

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mt-8">
            {error && (
              <div className="mb-6 bg-error-50 text-error-700 p-4 rounded-lg flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Credential File</h2>
                <div 
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
                    isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    {isDragActive ? 'Drop the file here' : 'Drag & drop your credential PDF here'}
                  </p>
                  <p className="text-gray-500 mb-4">or click to browse files</p>
                  <p className="text-xs text-gray-500">
                    Only PDF files are accepted. Maximum file size: 10MB.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && file && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Credential Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center">
                  <FileText className="w-8 h-8 text-primary-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <CredentialForm onSubmit={handleFormSubmit} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-6"></div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Your Credential</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                  We're analyzing your credential, uploading it to IPFS, and minting a verification NFT. This may take a moment.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-success-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Credential Verified!</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your credential has been successfully uploaded to IPFS and verified with a blockchain NFT.
                </p>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-500">IPFS Hash</span>
                    <span className="text-sm text-primary-600 font-mono">{ipfsHash.substring(0, 18)}...</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">NFT Token ID</span>
                    <span className="text-sm text-primary-600 font-mono">{tokenId}</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={goToDashboard}
                    className="btn-primary flex items-center"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    View in Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;