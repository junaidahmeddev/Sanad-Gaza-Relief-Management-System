import React from 'react'

import { Phone, Mail, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

const Topbar = () => {
  return (
     <div className="bg-purple-600 text-white py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between">
          {/* Contact Information */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+92-000000</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">info@sanad.com</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="hover:text-purple-200 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="hover:text-purple-200 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="hover:text-purple-200 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="hover:text-purple-200 transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
