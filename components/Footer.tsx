import React from 'react';
import { RESUME_DATA } from '../constants';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black py-12 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Let's Connect</h2>
            <div className="flex flex-col gap-3">
                <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400 hover:text-crimson transition-colors">
                    <Mail size={18} />
                    {RESUME_DATA.email}
                </a>
                <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400">
                    <Phone size={18} />
                    {RESUME_DATA.phone}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} />
                    {RESUME_DATA.location}
                </div>
            </div>
        </div>

        <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm mb-2">
                Designed with <Heart size={12} className="inline text-crimson fill-crimson mx-1" /> by Anantkumar Saunshi
            </p>
            <p className="text-gray-400 dark:text-gray-600 text-xs">
                © {new Date().getFullYear()} Anantkumar Saunshi. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;