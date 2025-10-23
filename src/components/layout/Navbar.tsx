import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlignCenterVertical as Certificate, Shield } from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';
import WalletConnect from '../wallet/WalletConnect';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address } = useWallet();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload', path: '/upload' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="text-primary-600 w-8 h-8" />
            <span className="text-2xl font-bold text-primary-600">CredBlock</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary-600 font-semibold'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block text-base font-medium transition-colors duration-200 py-2 ${
                  location.pathname === link.path
                    ? 'text-primary-600 font-semibold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <WalletConnect isMobile />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;