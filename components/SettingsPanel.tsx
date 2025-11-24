
import React, { useState, useEffect } from 'react';
import { Settings, X, Check } from 'lucide-react';

const ACCENT_COLORS = [
  { name: 'Red', rgb: '201 42 42', hex: '#C92A2A' },
  { name: 'Blue', rgb: '37 99 235', hex: '#2563eb' },
  { name: 'Green', rgb: '22 163 74', hex: '#16a34a' }
];

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeColor, setActiveColor] = useState('Red');

  useEffect(() => {
    // Load saved settings
    const savedMotion = localStorage.getItem('reduceMotion') === 'true';
    const savedColorName = localStorage.getItem('themeAccent') || 'Red';
    const savedColorData = ACCENT_COLORS.find(c => c.name === savedColorName) || ACCENT_COLORS[0];

    setReduceMotion(savedMotion);
    setActiveColor(savedColorName);
    
    // Apply initial settings
    applyMotion(savedMotion);
    applyColor(savedColorData.rgb);
  }, []);

  const applyMotion = (isReduced: boolean) => {
    if (isReduced) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  };

  const applyColor = (rgb: string) => {
    document.documentElement.style.setProperty('--accent-rgb', rgb);
  };

  const toggleMotion = () => {
    const newValue = !reduceMotion;
    setReduceMotion(newValue);
    localStorage.setItem('reduceMotion', String(newValue));
    applyMotion(newValue);
  };

  const changeColor = (colorName: string) => {
    const colorData = ACCENT_COLORS.find(c => c.name === colorName);
    if (colorData) {
      setActiveColor(colorName);
      localStorage.setItem('themeAccent', colorName);
      applyColor(colorData.rgb);
    }
  };

  return (
    <>
      {/* Floating Gear Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-24 right-0 z-40 p-3 bg-white/90 dark:bg-white/10 backdrop-blur-md border-l border-t border-b border-gray-300 dark:border-gray-500/30 hover:border-crimson text-gray-800 dark:text-white rounded-l-xl shadow-lg transition-all duration-300 hover:pl-5 group ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        title="Settings"
      >
        <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-charcoal/90 backdrop-blur-xl border-l border-crimson shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings size={20} className="text-crimson" />
            Settings
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          
          {/* Accessibility Section */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">Accessibility</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Reduce Motion</p>
                <p className="text-xs text-gray-400 mt-1">Disable heavy animations</p>
              </div>
              <button 
                onClick={toggleMotion}
                className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${reduceMotion ? 'bg-crimson' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${reduceMotion ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Appearance Section */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">Theme Accent</h3>
            <div className="grid grid-cols-3 gap-4">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => changeColor(color.name)}
                  className={`
                    relative h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
                    ${activeColor === color.name ? 'border-white scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'}
                  `}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {activeColor === color.name && (
                    <Check size={20} className="text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Click a color to instantly update the site theme.
            </p>
          </div>
        </div>
        
        <div className="p-6 border-t border-white/10 text-center">
           <p className="text-xs text-gray-500">Preferences are saved automatically.</p>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
