
import React, { useState, useEffect } from 'react';
import { Profile, Skill, Experience, Project, Certification } from '../types';
import { Download, ArrowRight, FileText } from 'lucide-react';

interface HeroProps {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  onNavigate: (page: 'home' | 'certifications' | 'projects' | 'resume', sectionId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ profile, skills, experiences, projects, certifications, onNavigate }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden bg-paper dark:bg-charcoal transition-colors duration-500">
      
      {/* ---------------------------------------------------------------------------
          Background: Subtle Abstract Data Visualization
      --------------------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="w-full h-full opacity-30 dark:opacity-20" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
              <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'#C92A2A', stopOpacity:0.1}} />
                      <stop offset="50%" style={{stopColor:'#C92A2A', stopOpacity:0.5}} />
                      <stop offset="100%" style={{stopColor:'#C92A2A', stopOpacity:0.1}} />
                  </linearGradient>
                  <filter id="blurFilter">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
              </defs>

              {/* Background Grid - Faint */}
              <pattern id="dataGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                 <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-white/5" />
                 <circle cx="1" cy="1" r="1" fill="#C92A2A" opacity="0.3" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dataGrid)" />

              {/* Abstract Data Lines / Wireframes */}
              <g className="animate-[float_15s_ease-in-out_infinite]">
                  <path d="M -100 800 Q 400 400 900 700 T 1900 300" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10 10" />
                  <path d="M -100 900 Q 500 700 1000 800 T 2000 600" fill="none" stroke="#C92A2A" strokeWidth="1" opacity="0.2" />
              </g>

              {/* Data Nodes & Connections */}
              <g>
                  <circle cx="1400" cy="300" r="3" fill="#C92A2A" opacity="0.6">
                       <animate attributeName="r" values="3;5;3" dur="4s" repeatCount="indefinite" />
                       <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="1350" cy="380" r="2" fill="#C92A2A" opacity="0.4" />
                  <circle cx="1480" cy="350" r="2" fill="#C92A2A" opacity="0.4" />
                  <line x1="1400" y1="300" x2="1350" y2="380" stroke="#C92A2A" strokeWidth="0.5" opacity="0.3" />
                  <line x1="1400" y1="300" x2="1480" y2="350" stroke="#C92A2A" strokeWidth="0.5" opacity="0.3" />
                  <line x1="1350" y1="380" x2="1480" y2="350" stroke="#C92A2A" strokeWidth="0.5" opacity="0.2" />

                  <circle cx="400" cy="700" r="4" fill="#C92A2A" opacity="0.5">
                       <animate attributeName="r" values="4;6;4" dur="5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="350" cy="780" r="2" fill="currentColor" className="text-gray-400 dark:text-gray-600" opacity="0.4" />
                  <line x1="400" y1="700" x2="350" y2="780" stroke="#C92A2A" strokeWidth="0.5" opacity="0.3" />
              </g>

              <circle cx="200" cy="200" r="1" fill="#C92A2A" opacity="0.4">
                   <animate attributeName="cy" from="200" to="150" dur="10s" repeatCount="indefinite" />
              </circle>
               <circle cx="1700" cy="800" r="1" fill="#C92A2A" opacity="0.4">
                   <animate attributeName="cy" from="800" to="750" dur="12s" repeatCount="indefinite" />
              </circle>
          </svg>
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#ffffff_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_20%,_#121212_100%)] opacity-80"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Info */}
        <div className={`space-y-8 ${mounted ? 'animate-in slide-in-from-left-10 fade-in duration-700' : 'opacity-0'}`}>
          <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 backdrop-blur-sm group transition-all shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{profile.status || "Available for roles"}</span>
                </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              {profile.name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-red-500">
                {profile.name.split(' ')[1]}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
                Transforming raw data into <span className="text-crimson font-semibold">actionable insights</span>.
            </p>
          </div>

          <div className="relative group">
              <div className="p-4 -m-2 rounded-xl border border-transparent">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                    {profile.summary}
                </p>
              </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 bg-crimson hover:bg-crimson-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-crimson/25 flex items-center gap-2"
            >
              View Projects <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => onNavigate('resume')}
              className="px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-semibold rounded-lg transition-all flex items-center gap-2 group hover:bg-gray-50 dark:hover:bg-white/10"
            >
              <FileText size={20} className="group-hover:text-crimson transition-colors" /> 
              View Resume
            </button>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className={`relative flex justify-center lg:justify-end ${mounted ? 'animate-in zoom-in-50 fade-in duration-700 delay-300' : 'opacity-0'}`}>
          <div className="relative w-80 h-80 md:w-96 md:h-96">
            {/* Abstract Shapes - Rotating Rims */}
            <div className="absolute inset-0 border border-crimson/30 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute -inset-4 border border-gray-300 dark:border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse] border-dashed"></div>
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-charcoal ring-2 ring-crimson/20 bg-gray-100 dark:bg-gray-800 shadow-2xl">
              <img 
                src={profile.avatar || "https://picsum.photos/seed/anant/600/600"} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
