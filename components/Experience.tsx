
import React, { useEffect } from 'react';
import { Experience as ExperienceType, Education } from '../types';
import { GraduationCap, Briefcase } from 'lucide-react';

interface ExperienceProps {
  experiences: ExperienceType[];
  educations: Education[];
}

const Experience: React.FC<ExperienceProps> = ({ 
  experiences, 
  educations
}) => {

  // Scroll Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal-item').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [experiences, educations]);

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-charcoalLight/30 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 relative">
            <h3 className="text-crimson font-semibold tracking-wider uppercase text-sm mb-2">Career Path</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Experience & Education</h2>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
            
            {/* Experience Section */}
            <div>
                <div className="flex items-center gap-4 mb-8">
                     <div className="p-2 bg-crimson/10 rounded-lg text-crimson"><Briefcase size={24} /></div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h3>
                </div>
                
                <div className="space-y-8">
                  {experiences.map((exp, idx) => (
                      <div key={exp.id} className="scroll-reveal-item relative group opacity-0 translate-y-10 transition-all duration-700 ease-out" style={{ transitionDelay: `${idx * 100}ms` }}>
                          <div className="bg-white dark:bg-charcoal rounded-xl p-8 border border-black dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow hover:border-crimson/30">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-crimson transition-colors">{exp.role}</h3>
                                  <p className="text-crimson font-medium text-lg">{exp.company}</p>
                                </div>
                                <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 whitespace-nowrap">
                                  {exp.period}
                                </span>
                            </div>
                            
                            <ul className="space-y-3 mt-4">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-3">
                                        <span className="mt-2 min-w-[6px] h-[6px] bg-crimson/60 rounded-full"></span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                      </div>
                  ))}
                </div>
            </div>

            {/* Education Section */}
            <div className="pt-12 border-t border-gray-200 dark:border-white/10">
                 <div className="flex items-center gap-4 mb-8">
                     <div className="p-2 bg-crimson/10 rounded-lg text-crimson"><GraduationCap size={24} /></div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h3>
                </div>

                <div className="space-y-8">
                  {educations.map((edu, idx) => (
                      <div key={edu.id} className="scroll-reveal-item relative group opacity-0 translate-y-10 transition-all duration-700 ease-out" style={{ transitionDelay: `${idx * 100}ms` }}>
                          <div className="bg-white dark:bg-charcoal rounded-xl p-8 border border-black dark:border-white/5 shadow-lg hover:shadow-xl transition-shadow hover:border-crimson/30">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-crimson transition-colors">{edu.degree}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">{edu.school}</p>
                                  </div>
                                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 whitespace-nowrap">
                                    {edu.period}
                                  </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  {edu.description}
                              </p>
                          </div>
                      </div>
                  ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
