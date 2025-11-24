
import React, { useState } from 'react';
import { Project } from '../types';
import { BarChart2, Github, ExternalLink, Link as LinkIcon, Check } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyLink = (e: React.MouseEvent, url: string, id: number) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <section id="projects" className="py-32 bg-paperAlt dark:bg-charcoal transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex items-end justify-between animate-in slide-in-from-bottom-5">
            <div>
                <h3 className="text-crimson font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
                    <span className="w-6 h-[2px] bg-crimson"></span> Portfolio
                </h3>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Selected Works</h2>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-charcoalLight rounded-lg overflow-hidden border border-black dark:border-white/5 hover:border-crimson/50 hover:scale-[1.02] hover:shadow-crimson/20 transition-all duration-300 shadow-lg hover:shadow-2xl dark:shadow-black/50 relative flex flex-col">
              
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-900 border-b border-black dark:border-white/5 shrink-0">
                <div className="absolute inset-0 bg-crimson/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {project.link && project.link !== '#' && (
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2.5 bg-white/90 dark:bg-charcoal/90 backdrop-blur rounded-lg text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:border-crimson hover:text-crimson transition-all block shadow-xl" 
                            title="View Live Project"
                            aria-label={`View live demo of ${project.title}`}
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                    {project.github && (
                        <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2.5 bg-white/90 dark:bg-charcoal/90 backdrop-blur rounded-lg text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 hover:border-crimson hover:text-crimson transition-all block shadow-xl" 
                            title="View Source Code"
                            aria-label={`View source code for ${project.title} on GitHub`}
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                        <span key={i} className="text-[11px] font-bold px-2.5 py-1 bg-crimson/5 dark:bg-crimson/10 text-crimson border border-crimson/10 dark:border-crimson/20 rounded-md uppercase tracking-wider">
                            {t}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-crimson transition-colors">
                    {project.title}
                  </h3>

                  {project.link && project.link !== '#' && (
                    <button
                        onClick={(e) => handleCopyLink(e, project.link, project.id)}
                        className="p-2 mt-0.5 text-gray-400 hover:text-crimson hover:bg-crimson/5 rounded-lg transition-all shrink-0"
                        title={copiedId === project.id ? "Copied!" : "Copy Live Link"}
                        aria-label="Copy live link to clipboard"
                    >
                        {copiedId === project.id ? (
                            <Check size={20} className="text-green-500 animate-in zoom-in" />
                        ) : (
                            <LinkIcon size={20} />
                        )}
                    </button>
                  )}
                </div>
                
                <ul className="space-y-3 mb-6 flex-1">
                    {project.description.map((desc, i) => (
                        <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-3 leading-relaxed">
                            <span className="mt-2 min-w-[4px] h-[4px] bg-crimson rounded-full"></span>
                            {desc}
                        </li>
                    ))}
                </ul>
                
                <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <BarChart2 size={14} className="text-crimson" />
                        <span>Data Analysis</span>
                    </div>
                     {project.link && project.link !== '#' ? (
                        <a 
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-crimson hover:text-crimson-600 transition-colors group/link px-4 py-2 bg-crimson/5 hover:bg-crimson/10 rounded-lg font-bold"
                            aria-label={`View live demo of ${project.title}`}
                            title="Launch project in new tab"
                        >
                            View Project <ExternalLink size={14} className="group-hover/link:translate-x-0.5 transition-transform"/>
                        </a>
                    ) : (
                        <span className="flex items-center gap-1.5 text-gray-400 cursor-not-allowed px-4 py-2 border border-black dark:border-white/5 rounded-lg">
                           Project Offline
                        </span>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
