import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiSearch, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-FITZY-dark py-4 border-b border-FITZY-charcoal/30 sticky top-0 z-50">
      <div className="FITZY-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-bold">
            FITZY
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#exercise-classes" className="text-white hover:text-FITZY-teal transition-colors">
            Exercises
          </a>
          <a href="#daily-tracker" className="text-white hover:text-FITZY-teal transition-colors">
            Fitness Tracker
          </a>
          <a href="#" className="text-white hover:text-FITZY-teal transition-colors">
            Blog
          </a>
        </nav>

        {/* Right section: search, account, etc. */}
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-FITZY-teal p-1">
            <FiSearch className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-FITZY-teal p-1">
            <FiUser className="w-5 h-5" />
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-FITZY-teal p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-FITZY-dark border-t border-FITZY-charcoal/30 py-4">
          <div className="FITZY-container flex flex-col space-y-4">
            <a href="#exercise-classes" className="text-white hover:text-FITZY-teal transition-colors py-2">
              Exercises
            </a>
            <a href="#daily-tracker" className="text-white hover:text-FITZY-teal transition-colors py-2">
              Fitness Tracker
            </a>
            <a href="#" className="text-white hover:text-FITZY-teal transition-colors py-2">
              Blog
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
