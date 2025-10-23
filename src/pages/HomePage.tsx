import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileUp, Award, Brain, Users, LockKeyhole, Cpu, Sparkles } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const HomePage = () => {
  const { address } = useWallet();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Verify Your Credentials with Blockchain & AI
              </h1>
              <p className="text-lg text-primary-100 max-w-lg">
                CredBlock securely stores and verifies your learning credentials using blockchain technology and enhances them with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                {address ? (
                  <Link to="/dashboard" className="btn-accent">
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn-accent">
                    Get Started
                  </Link>
                )}
                <a href="#how-it-works" className="btn btn-outline border-white text-white hover:bg-white/10">
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Credential Verification" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent-400 rounded-full opacity-30 blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-400 rounded-full opacity-30 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines blockchain technology and artificial intelligence to create a secure and intelligent credential verification system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <FileUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Upload Credentials</h3>
              <p className="text-gray-600">
                Simply upload your PDF learning credentials to our secure platform for processing.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-6">
                <Cpu className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes your credentials, extracts key information, and generates summaries.
              </p>
            </div>

            <div className="card flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Blockchain Verification</h3>
              <p className="text-gray-600">
                Your credentials are securely stored on IPFS and verified with Polygon blockchain NFTs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CredBlock offers several advantages for learners, educators, and employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <LockKeyhole className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Tamper-Proof Security</h3>
                <p className="text-gray-600">
                  Blockchain technology ensures your credentials cannot be altered or falsified, providing ultimate security and trust.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Get intelligent summaries and question-answering capabilities to enhance the value of your credentials.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">
                  Share verified credentials with employers or institutions with just a link, maintaining control over your data.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-success-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Credential Ownership</h3>
                <p className="text-gray-600">
                  Own your credentials as NFTs, giving you true digital ownership of your educational achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-900 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 text-secondary-300" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Ready to Verify Your Credentials?</h2>
            <p className="text-xl text-secondary-100 mb-8">
              Join our platform today and experience the future of credential verification with blockchain and AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {address ? (
                <Link to="/dashboard" className="btn bg-white text-secondary-700 hover:bg-gray-100">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" className="btn bg-white text-secondary-700 hover:bg-gray-100">
                  Get Started Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;