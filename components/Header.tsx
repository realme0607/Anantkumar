
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sun, Moon, Settings as SettingsIcon, FileText } from 'lucide-react';

interface HeaderProps {
  currentPage: 'home' | 'certifications' | 'projects' | 'settings' | 'resume';
  onNavigate: (page: 'home' | 'certifications' | 'projects' | 'settings' | 'resume', sectionId?: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentPage === 'home') {
        // Simple scrollspy to update active section
        const sections = ['about', 'skills', 'experience', 'contact'];
        let current = '';
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              current = section;
            }
          }
        }
        if (current) {
            setActiveSection(current);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (page: 'home' | 'certifications' | 'projects' | 'settings' | 'resume', sectionId?: string) => {
    setIsMenuOpen(false);
    if (page === 'home' && sectionId) {
        setActiveSection(sectionId);
    }
    onNavigate(page, sectionId);
  };

  const navLinks = [
    { name: 'About', page: 'home' as const, sectionId: 'about' },
    { name: 'Skills', page: 'home' as const, sectionId: 'skills' },
    { name: 'Experience', page: 'home' as const, sectionId: 'experience' },
    { name: 'Projects', page: 'projects' as const, sectionId: undefined },
    { name: 'Certifications', page: 'certifications' as const, sectionId: undefined },
    { name: 'Resume', page: 'resume' as const, sectionId: undefined },
  ];

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (currentPage === 'certifications' && link.page === 'certifications') return true;
    if (currentPage === 'projects' && link.page === 'projects') return true;
    if (currentPage === 'resume' && link.page === 'resume') return true;
    if (currentPage === 'home' && link.page === 'home' && link.sectionId === activeSection) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-charcoal/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-4 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick('home', 'about')}
        >
            <div className="w-8 h-8 bg-crimson rounded-br-lg rounded-tl-lg flex items-center justify-center font-bold text-white shadow-md">
                AS
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Anantkumar<span className="text-crimson">.</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name} 
              onClick={() => handleNavClick(link.page, link.sectionId)}
              className={`text-sm font-medium transition-colors relative ${
                isLinkActive(link)
                  ? 'text-crimson' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-crimson dark:hover:text-crimson'
              }`}
            >
              {link.name}
              {isLinkActive(link) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-crimson animate-in fade-in zoom-in"></span>
              )}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('settings')}
            className={`text-sm font-medium transition-colors flex items-center gap-1 ${
              currentPage === 'settings'
                ? 'text-crimson' 
                : 'text-gray-600 dark:text-gray-300 hover:text-crimson dark:hover:text-crimson'
            }`}
          >
            <SettingsIcon size={14} /> Admin
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
             <button 
               onClick={toggleTheme}
               className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
               aria-label="Toggle theme"
             >
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-crimson dark:hover:text-white transition-colors"><Github size={20} /></a>
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-crimson dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
             <button 
                onClick={() => handleNavClick('home', 'contact')}
                className="px-4 py-2 bg-crimson hover:bg-crimson-600 text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-crimson/20 hover:shadow-crimson/40"
             >
                Contact Me
             </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
               onClick={toggleTheme}
               className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
             >
               {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-charcoal border-b border-gray-200 dark:border-white/10 p-6 animate-in slide-in-from-top-5 shadow-2xl z-50">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.page, link.sectionId)}
                className={`text-lg font-medium text-left transition-colors ${
                    isLinkActive(link) ? 'text-crimson' : 'text-gray-600 dark:text-gray-300 hover:text-crimson'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
                onClick={() => handleNavClick('settings')}
                className={`text-lg font-medium text-left transition-colors flex items-center gap-2 ${
                  currentPage === 'settings' ? 'text-crimson' : 'text-gray-600 dark:text-gray-300 hover:text-crimson'
                }`}
            >
                <SettingsIcon size={18} /> Content Admin
            </button>
            <button 
                onClick={() => handleNavClick('home', 'contact')}
                className="text-lg font-medium text-left transition-colors text-crimson"
            >
                Contact Me
            </button>
             <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-crimson dark:hover:text-white"><Github size={24} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-crimson dark:hover:text-white"><Linkedin size={24} /></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
