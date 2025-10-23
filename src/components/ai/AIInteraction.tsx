import React, { useState } from 'react';
import { X, Send, Brain, Sparkles, User } from 'lucide-react';
import { Credential } from '../../contexts/CredentialsContext';

interface AIInteractionProps {
  credential: Credential;
  isOpen: boolean;
  onClose: () => void;
}

const AIInteraction: React.FC<AIInteractionProps> = ({ credential, isOpen, onClose }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    { 
      role: 'ai', 
      content: `Hello! I'm your AI assistant for the "${credential.name}" credential. How can I help you today? You can ask me to summarize the content, explain concepts, or answer specific questions about this material.`
    }
  ]);

  // Quick question suggestions
  const questionSuggestions = [
    "Summarize this credential",
    "What are the key topics covered?",
    "Verify the authenticity of this credential",
    "When was this credential issued?"
  ];

  const handleSendQuestion = () => {
    if (!question.trim()) return;
    
    // Add user message to conversation
    setConversation([...conversation, { role: 'user', content: question }]);
    
    // Simulate AI thinking
    setIsLoading(true);
    setTimeout(() => {
      let response = '';
      
      // Demo responses based on different question patterns
      if (question.toLowerCase().includes('summarize') || question.toLowerCase().includes('summary')) {
        response = `This credential covers ${credential.name}, issued by ${credential.issuer}. It demonstrates proficiency in blockchain technology, smart contracts, and decentralized applications. The course covered fundamental concepts including distributed ledgers, consensus mechanisms, and practical implementation of Web3 technologies.`;
      } else if (question.toLowerCase().includes('verify') || question.toLowerCase().includes('authentic')) {
        response = `This credential has been verified on the Polygon Mumbai blockchain with token ID: ${credential.tokenId}. The content hash stored on IPFS (${credential.ipfsHash.substring(0, 10)}...) ensures that the credential content has not been altered since issuance.`;
      } else if (question.toLowerCase().includes('when') || question.toLowerCase().includes('date') || question.toLowerCase().includes('issued')) {
        response = `This credential was issued on ${new Date(credential.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} by ${credential.issuer}.`;
      } else if (question.toLowerCase().includes('topic') || question.toLowerCase().includes('covered')) {
        response = `The key topics covered in this credential include: blockchain fundamentals, smart contract development, decentralized storage solutions, Web3 integration, and credential verification systems. Each topic was explored through both theoretical concepts and practical implementations.`;
      } else {
        response = `Based on the content of this credential, I can tell you that ${credential.name} from ${credential.issuer} demonstrates your knowledge of blockchain technology and its applications. To provide more specific information about your question, I would need more context from the credential content.`;
      }
      
      // Add AI response to conversation
      setConversation([...conversation, { role: 'user', content: question }, { role: 'ai', content: response }]);
      setQuestion('');
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendQuestion();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen justify-center items-center p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-xl shadow-xl flex flex-col w-full max-w-2xl max-h-[80vh] z-10">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Brain className="w-5 h-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-bold">AI Assistant - {credential.name}</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.role === 'user' ? (
                      <>
                        <span className="font-medium">You</span>
                        <User className="w-3 h-3 ml-1" />
                      </>
                    ) : (
                      <>
                        <span className="font-medium">AI Assistant</span>
                        <Sparkles className="w-3 h-3 ml-1" />
                      </>
                    )}
                  </div>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Quick Question Suggestions */}
          {conversation.length < 3 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {questionSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-3 py-1.5 transition-colors duration-200"
                    onClick={() => {
                      setQuestion(suggestion);
                      setTimeout(() => handleSendQuestion(), 100);
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about this credential..."
                className="input flex-1"
                disabled={isLoading}
              />
              <button
                onClick={handleSendQuestion}
                disabled={!question.trim() || isLoading}
                className={`btn-primary px-3 ${(!question.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInteraction;