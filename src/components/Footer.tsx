import React from 'react';
import {
  FiPhone,
  FiMail,
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-FITZY-dark border-t border-FITZY-charcoal/30 pt-12 pb-6">
      <div className="FITZY-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">FITZY</h3>
            <p className="text-gray-400 mb-4">Empower With Passion</p>
          </div>

          {/* Links section 1 */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Fitness</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Exercises
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

        
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Team 4bits</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Atharva Khot
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Vishal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Rahul
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-FITZY-teal transition-colors">
                  Neeraj
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <FiPhone className="w-5 h-5 mr-3 text-FITZY-teal" />
                <span>8591637592</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FiMail className="w-5 h-5 mr-3 text-FITZY-teal" />
                <span>atharvakhot016@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
