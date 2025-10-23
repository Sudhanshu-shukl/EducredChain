import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="text-primary-400 w-6 h-6" />
              <span className="text-xl font-bold text-primary-400">CredBlock</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Securely verify and share your learning credentials using blockchain technology and AI.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Upload Credentials
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CredBlock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;