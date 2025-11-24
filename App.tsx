
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SkillsMatrix from './components/SkillsMatrix';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import SettingsPanel from './components/SettingsPanel';
import SettingsPage from './components/SettingsPage';
import ResumePage from './components/ResumePage';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';

import { RESUME_DATA, SKILLS, PROJECTS, EXPERIENCES, INITIAL_EDUCATION, INITIAL_CERTIFICATIONS } from './constants';
import { Certification, Profile, Skill, Project, Experience as ExperienceType, Education } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'certifications' | 'projects' | 'settings' | 'resume'>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAdmin, setHasAdmin] = useState(false);
  
  // State for all data sections
  const [profile, setProfile] = useState<Profile>(RESUME_DATA);
  const [skills, setSkills] = useState<Skill[]>(SKILLS);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [experiences, setExperiences] = useState<ExperienceType[]>(EXPERIENCES);
  const [educations, setEducations] = useState<Education[]>(INITIAL_EDUCATION);
  const [certifications, setCertifications] = useState<Certification[]>(INITIAL_CERTIFICATIONS);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check if admin is configured
  useEffect(() => {
    const storedPwd = localStorage.getItem('portfolio_admin_key');
    setHasAdmin(!!storedPwd);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleNavigate = (page: 'home' | 'certifications' | 'projects' | 'settings' | 'resume', sectionId?: string) => {
    setCurrentPage(page);
    
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogin = (password: string) => {
    const storedPwd = localStorage.getItem('portfolio_admin_key');
    if (storedPwd && password === storedPwd) {
        setIsAuthenticated(true);
        return true;
    }
    return false;
  };

  const handleSignup = (password: string) => {
    localStorage.setItem('portfolio_admin_key', password);
    setHasAdmin(true);
    setIsAuthenticated(true);
  };

  const handleUpdatePassword = (password: string) => {
    localStorage.setItem('portfolio_admin_key', password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    handleNavigate('home');
  };

  // Profile Handlers
  const handleUpdateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  // Skills Handlers
  const handleAddSkill = (skill: Skill) => {
    setSkills([...skills, { ...skill, id: Date.now() }]);
  };
  const handleUpdateSkill = (index: number, updatedSkill: Skill) => {
    const newSkills = [...skills];
    newSkills[index] = updatedSkill;
    setSkills(newSkills);
  };
  const handleDeleteSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const handleReorderSkills = (newSkills: Skill[]) => setSkills(newSkills);

  // Projects Handlers
  const handleAddProject = (project: Project) => {
    setProjects([...projects, project]);
  };
  const handleUpdateProject = (id: number, updatedProject: Project) => {
    setProjects(projects.map(p => p.id === id ? updatedProject : p));
  };
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };
  const handleReorderProjects = (newProjects: Project[]) => setProjects(newProjects);


  // Experience Handlers
  const handleAddExperience = (exp: ExperienceType) => {
    setExperiences([...experiences, exp]);
  };
  const handleUpdateExperience = (id: number, updatedExp: ExperienceType) => {
    setExperiences(experiences.map(e => e.id === id ? updatedExp : e));
  };
  const handleDeleteExperience = (id: number) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };
  const handleReorderExperiences = (newExperiences: ExperienceType[]) => setExperiences(newExperiences);

  // Education Handlers
  const handleAddEducation = (edu: Education) => {
    setEducations([...educations, edu]);
  };
  const handleUpdateEducation = (id: number, updatedEdu: Education) => {
    setEducations(educations.map(e => e.id === id ? updatedEdu : e));
  };
  const handleDeleteEducation = (id: number) => {
    setEducations(educations.filter(e => e.id !== id));
  };
  const handleReorderEducations = (newEducations: Education[]) => setEducations(newEducations);

  // Certification Handlers
  const handleAddCertification = (newCert: Certification) => {
    setCertifications(prev => [newCert, ...prev]);
  };
  const handleUpdateCertification = (id: number, updatedCert: Certification) => {
    setCertifications(prev => prev.map(c => c.id === id ? updatedCert : c));
  };
  const handleDeleteCertification = (id: number) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
  };
  const handleReorderCertifications = (newCerts: Certification[]) => setCertifications(newCerts);

  // Global Data Import Handler
  const handleImportData = (data: any) => {
    if (data.profile) setProfile(data.profile);
    if (data.skills) setSkills(data.skills);
    if (data.projects) setProjects(data.projects);
    if (data.experiences) setExperiences(data.experiences);
    if (data.educations) setEducations(data.educations);
    if (data.certifications) setCertifications(data.certifications);
  };

  return (
    <div className="bg-gray-50 dark:bg-charcoal text-gray-900 dark:text-white selection:bg-crimson selection:text-white overflow-x-hidden min-h-screen flex flex-col transition-colors duration-300">
      <SettingsPanel />
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero 
              profile={profile} 
              skills={skills}
              experiences={experiences}
              projects={projects}
              certifications={certifications}
              onNavigate={handleNavigate}
            />
            <SkillsMatrix 
              skills={skills}
              certifications={certifications} 
              onNavigateToCertifications={() => handleNavigate('certifications')}
            />
            <Experience 
              experiences={experiences}
              educations={educations}
            />
            <Contact />
          </>
        )}

        {currentPage === 'projects' && (
           <Projects 
            projects={projects}
          />
        )}

        {currentPage === 'certifications' && (
          <Certifications 
            certifications={certifications}
          />
        )}

        {currentPage === 'resume' && (
          <ResumePage 
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentPage === 'settings' && (
          isAuthenticated ? (
            <SettingsPage
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onUpdatePassword={handleUpdatePassword}
              
              skills={skills}
              onAddSkill={handleAddSkill}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
              onReorderSkills={handleReorderSkills}

              experiences={experiences}
              onAddExperience={handleAddExperience}
              onUpdateExperience={handleUpdateExperience}
              onDeleteExperience={handleDeleteExperience}
              onReorderExperiences={handleReorderExperiences}

              educations={educations}
              onAddEducation={handleAddEducation}
              onUpdateEducation={handleUpdateEducation}
              onDeleteEducation={handleDeleteEducation}
              onReorderEducations={handleReorderEducations}

              projects={projects}
              onAddProject={handleAddProject}
              onUpdateProject={handleUpdateProject}
              onDeleteProject={handleDeleteProject}
              onReorderProjects={handleReorderProjects}

              certifications={certifications}
              onAddCertification={handleAddCertification}
              onUpdateCertification={handleUpdateCertification}
              onDeleteCertification={handleDeleteCertification}
              onReorderCertifications={handleReorderCertifications}

              onImportData={handleImportData}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin 
                isSetupMode={!hasAdmin}
                onLogin={handleLogin} 
                onSignup={handleSignup}
                onCancel={() => handleNavigate('home')} 
            />
          )
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
