
import React, { useState, useEffect, useRef } from 'react';
import { Skill, Certification } from '../types';
import { Award, ArrowRight, TrendingUp, PieChart } from 'lucide-react';

interface SkillsMatrixProps {
  skills: Skill[];
  certifications: Certification[];
  onNavigateToCertifications: () => void;
}

const SkillBar: React.FC<{ skill: Skill; index: number; isVisible: boolean }> = ({ skill, index, isVisible }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Staggered animation delay based on index
      const delay = index * 100;
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay);
      return () => clearTimeout(timer);
    } else {
        setWidth(0);
    }
  }, [isVisible, skill.level, index]);

  return (
    <div className="group relative">
        <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-crimson transition-colors flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson/50 group-hover:bg-crimson transition-colors"></span>
                {skill.name}
            </span>
            <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
        </div>
        
        <div className="h-2 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden border border-transparent dark:border-white/5">
            <div 
            className="h-full bg-crimson rounded-full relative ease-out"
            style={{ 
                width: `${width}%`,
                transition: 'width 1500ms cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            >
            </div>
        </div>
    </div>
  );
};

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ 
  skills, 
  certifications, 
  onNavigateToCertifications,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Animate once
      }
    }, { threshold: 0.1 }); // Trigger when 10% visible

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden bg-white dark:bg-[#121212] transition-colors duration-300">
      {/* Data Visualization Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-5 dark:opacity-10 transition-opacity duration-300" preserveAspectRatio="none" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            {/* Grid */}
            <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-400 dark:text-white"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
            
            {/* Wireframe Histograms */}
            <path d="M0 900 L100 700 L200 850 L300 600 L400 750 L500 400 L600 650 L700 500 L800 800 L900 600 L1000 900 V1000 H0 Z" fill="rgba(201, 42, 42, 0.1)" stroke="rgba(201, 42, 42, 0.5)" strokeWidth="2" />
            
            {/* Rising Line Chart */}
            <polyline points="0,800 200,700 400,750 600,500 800,550 1000,300" fill="none" stroke="#C92A2A" strokeWidth="3" strokeDasharray="10,5" opacity="0.7" />
            
            {/* Scatter Plot Dots */}
            <circle cx="150" cy="200" r="3" className="fill-gray-500 dark:fill-white" opacity="0.3" />
            <circle cx="850" cy="150" r="4" className="fill-gray-500 dark:fill-white" opacity="0.3" />
            <circle cx="500" cy="100" r="2" className="fill-gray-500 dark:fill-white" opacity="0.3" />
            <circle cx="900" cy="400" r="3" fill="#C92A2A" opacity="0.6" />
            <circle cx="100" cy="500" r="5" fill="#C92A2A" opacity="0.4" />
        </svg>
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_10%,_#ffffff_80%)] dark:bg-[radial-gradient(circle_at_center,_transparent_10%,_#121212_80%)] transition-all duration-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex justify-between items-end">
            <div>
                <h3 className="text-crimson font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
                    <TrendingUp size={16} /> Expertise
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Skills Matrix</h2>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Progress Bars */}
          <div className="space-y-8">
            {skills.map((skill, index) => (
              <SkillBar 
                key={skill.id || skill.name || index} 
                skill={skill} 
                index={index} 
                isVisible={isVisible} 
              />
            ))}
          </div>

          {/* Certifications & Tools */}
          <div className="grid gap-8">
            <div className="bg-white dark:bg-charcoalLight/50 p-8 rounded-lg border border-black dark:border-white/5 hover:border-crimson/30 transition-all hover:shadow-xl group backdrop-blur-sm shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:text-crimson transition-colors">
                        <Award className="text-crimson" size={20} />
                        Certifications
                    </h3>
                    <button 
                      onClick={onNavigateToCertifications}
                      className="text-xs text-crimson hover:text-gray-900 dark:hover:text-white flex items-center gap-1 transition-colors px-3 py-1 bg-crimson/10 rounded-lg font-medium"
                    >
                      View All <ArrowRight size={12} />
                    </button>
                </div>
                <ul className="space-y-4">
                    {certifications.slice(0, 3).map((cert, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 group/item hover:bg-gray-50 dark:hover:bg-white/5 p-2 rounded-lg -mx-2 transition-colors">
                            <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-crimson group-hover/item:scale-125 transition-transform"></div>
                            <span>
                                <span className="text-gray-800 dark:text-gray-200 font-medium block">{cert.name}</span>
                                <span className="block text-xs text-gray-500">{cert.issuer} • {cert.year}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white dark:bg-charcoalLight/50 p-8 rounded-lg border border-black dark:border-white/5 hover:border-crimson/30 transition-all hover:shadow-xl backdrop-blur-sm shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <PieChart className="text-crimson" size={20} />
                    Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                    {/* Extract unique skills from skills list for tags */}
                    {skills.map((skill) => (
                        <span key={skill.name} className="px-3 py-1.5 bg-gray-100 dark:bg-charcoal border border-gray-200 dark:border-white/10 hover:border-crimson/50 hover:text-crimson text-gray-700 dark:text-gray-300 rounded text-sm transition-all cursor-default shadow-sm">
                            {skill.name}
                        </span>
                    ))}
                    <span className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 border-dashed text-gray-500 rounded text-sm">+ More</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
