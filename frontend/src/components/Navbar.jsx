import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from "../assets/Logo.png"
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHelpGazaOpen, setHelpGazaOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  const handleDropdownToggle = () => {
    setHelpGazaOpen(!isHelpGazaOpen);
  };

  return (
    <nav className="bg-gray-50 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center gap-2">
           <img src={logo} alt="Logo" className='size-10'/>
          <span className="text-2xl font-bold text-gray-800">Sanad</span>
        </div>
      </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-purple-400 font-normal text-sm">
          {/* Help Gaza Dropdown */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="hover:text-purple-600 transition flex items-center gap-1 text-lg font-bold text-purple-600"
            >
              Help Gaza
              <ChevronDown className={`w-5 h-5 transition-transform ${isHelpGazaOpen ? 'rotate-180' : ''}`} />
            </button>
            {isHelpGazaOpen && (
              <>
                {/* Backdrop to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setHelpGazaOpen(false)}
                />
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 mt-3 w-72 bg-white border-0 rounded-2xl shadow-2xl z-50 p-2">
                  <div className="p-2">
                    <a 
                      href="/orphan-wallet" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setHelpGazaOpen(false)}
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 font-bold">👶</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Orphan Wallet</div>
                        <div className="text-sm text-gray-500">Support orphaned children</div>
                      </div>
                    </a>
                    <a 
                      href="/memory" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setHelpGazaOpen(false)}
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 font-bold">💭</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">MemoryLine</div>
                        <div className="text-sm text-gray-500">Remember the stories</div>
                      </div>
                    </a>
                    <a 
                      href="/rebuild-gaza" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setHelpGazaOpen(false)}
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 font-bold">🏗️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Rebuild Gaza</div>
                        <div className="text-sm text-gray-500">Reconstruction efforts</div>
                      </div>
                    </a>
                     <a 
                      href="/blacklist" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl transition-all duration-200 group"
                      onClick={() => setHelpGazaOpen(false)}
                    >
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-600 font-bold">🚫</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Blacklist</div>
                        <div className="text-sm text-gray-500">BlackList Items & Countries</div>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <a href="/contact" className="hover:text-purple-600 transition text-lg font-bold text-purple-600">Contact Us</a>
          
          <a
            href="/donate"
            className="bg-purple-100 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-200 transition flex items-center gap-2 text-lg font-bold border border-purple-300"
          >
            Donate Now
            <span className="text-purple-500">♥</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-purple-400 font-normal text-sm border-t bg-gray-50">
          {/* Help Gaza Mobile Dropdown */}
          <details className="block">
            <summary className="cursor-pointer py-2 text-lg font-bold text-purple-600">Help Gaza</summary>
            <div className="ml-4 space-y-2 bg-purple-50 rounded-lg p-3 mt-2">
              <a href="/orphan-wallet" className="flex items-center gap-2 py-2 px-3 hover:bg-white rounded-lg transition-colors">
                <span>👶</span>
                <span className="font-medium">Orphan Wallet</span>
              </a>
              <a href="/memoryline" className="flex items-center gap-2 py-2 px-3 hover:bg-white rounded-lg transition-colors">
                <span>💭</span>
                <span className="font-medium">MemoryLine</span>
              </a>
              <a href="/rebuild-gaza" className="flex items-center gap-2 py-2 px-3 hover:bg-white rounded-lg transition-colors">
                <span>🏗️</span>
                <span className="font-medium">Rebuild Gaza</span>
              </a>
              <a href="/blacklist" className="flex items-center gap-2 py-2 px-3 hover:bg-white rounded-lg transition-colors">
                <span>🚫</span>
                <span className="font-medium">Blacklist</span>
              </a>
            </div>
          </details>

          <a href="/contact" className="block py-2 text-lg font-bold text-purple-600">Contact Us</a>
          <a href="/donate" className="block bg-purple-100 text-purple-600 px-8 py-3 rounded-lg text-center mt-4 border border-purple-300 text-lg font-bold">
            Donate Now ♥
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;