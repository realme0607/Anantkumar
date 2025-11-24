
import React, { useEffect } from 'react';
import { Certification } from '../types';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cert-scroll-item').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [certifications]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-gray-50 dark:bg-gradient-to-b dark:from-[#1F1F1F] dark:to-[#121212] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12 animate-in slide-in-from-bottom-5 duration-700">
            <div>
                <h3 className="text-crimson font-semibold tracking-wider uppercase text-sm mb-2">Qualifications</h3>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Certifications & Licenses</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
                <div 
                    key={cert.id} 
                    className="cert-scroll-item group bg-white dark:bg-charcoal border border-black dark:border-white/5 rounded-2xl overflow-hidden hover:border-crimson/40 transition-all duration-700 flex flex-col h-full relative hover:shadow-2xl hover:shadow-crimson/5 hover:-translate-y-2 opacity-0 translate-y-8 fill-mode-both shadow-lg"
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    {/* Visual/Image Section */}
                    <div className="relative h-48 bg-gray-100 dark:bg-white/5 border-b border-black dark:border-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-crimson/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {cert.image ? (
                            <img 
                                src={cert.image} 
                                alt={cert.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-700 gap-2 group-hover:text-gray-50 dark:group-hover:text-gray-600 transition-colors">
                                <Award size={48} strokeWidth={1} />
                                <span className="text-xs uppercase tracking-widest opacity-50">No Image</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-1 relative bg-gradient-to-b from-transparent to-gray-50 dark:to-black/20">
                        <div className="mb-auto">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-crimson transition-colors">{cert.name}</h3>
                            
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Award size={14} className="text-crimson" />
                                    <span className="font-medium text-gray-800 dark:text-gray-300">{cert.issuer}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={14} />
                                    <span>Issued {cert.year}</span>
                                </div>
                            </div>
                        </div>
                        
                        {cert.link && (
                            <a 
                                href={cert.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 border border-black dark:border-white/10 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 hover:border-crimson/50 transition-all group-hover:bg-gray-50 dark:group-hover:bg-white/5"
                            >
                                Show Credential <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {certifications.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-24 text-gray-500 bg-white dark:bg-white/5 rounded-2xl border border-dashed border-black dark:border-white/10 animate-in fade-in zoom-in-95 shadow-sm">
                    <Award size={48} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">No certifications added yet.</p>
                    <p className="text-sm">Go to settings to manage certifications.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
