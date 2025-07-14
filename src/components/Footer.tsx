import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold">Green Paradise</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for high-quality plants and expert gardening advice. 
              Creating beautiful green spaces since 2018.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plants" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Shop Plants
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Plant Care Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plant Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/plants?category=Indoor" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link to="/plants?category=Outdoor" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link to="/plants?category=Medicinal" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">
                  Medicinal Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">info@greenparadise.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">(+977) 4479638</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span className="text-gray-300">Kalimati, Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Green Paradise. All rights reserved. Made with ❤️ for plant lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;