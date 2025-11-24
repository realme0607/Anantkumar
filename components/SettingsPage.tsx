
import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Profile, Skill, Experience, Education, Project, Certification } from '../types';
import { 
  User, Briefcase, GraduationCap, Code, Award, Layers, 
  Plus, Trash2, Edit2, X, Check, LayoutDashboard, 
  Download, Upload, Save, Search, AlertCircle, Database,
  Image as ImageIcon, ArrowUp, ArrowDown, CheckCircle, XCircle, AlertTriangle, FileText, LogOut, Lock, ShieldCheck
} from 'lucide-react';

interface SettingsPageProps {
  profile: Profile;
  onUpdateProfile: (p: Profile) => void;
  onUpdatePassword: (p: string) => void;
  
  skills: Skill[];
  onAddSkill: (s: Skill) => void;
  onUpdateSkill: (i: number, s: Skill) => void;
  onDeleteSkill: (i: number) => void;
  onReorderSkills: (s: Skill[]) => void;

  experiences: Experience[];
  onAddExperience: (e: Experience) => void;
  onUpdateExperience: (id: number, e: Experience) => void;
  onDeleteExperience: (id: number) => void;
  onReorderExperiences: (e: Experience[]) => void;

  educations: Education[];
  onAddEducation: (e: Education) => void;
  onUpdateEducation: (id: number, e: Education) => void;
  onDeleteEducation: (id: number) => void;
  onReorderEducations: (e: Education[]) => void;

  projects: Project[];
  onAddProject: (p: Project) => void;
  onUpdateProject: (id: number, p: Project) => void;
  onDeleteProject: (id: number) => void;
  onReorderProjects: (p: Project[]) => void;

  certifications: Certification[];
  onAddCertification: (c: Certification) => void;
  onUpdateCertification: (id: number, c: Certification) => void;
  onDeleteCertification: (id: number) => void;
  onReorderCertifications: (c: Certification[]) => void;

  onImportData: (data: any) => void;
  onLogout: () => void;
}

type Tab = 'dashboard' | 'profile' | 'skills' | 'experience' | 'education' | 'projects' | 'certifications' | 'system' | 'security';

interface ToastMessage {
  id: number;
  type: 'success' | 'error';
  text: string;
}

const SettingsPage: React.FC<SettingsPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<Exclude<Tab, 'dashboard' | 'system' | 'profile' | 'security'> | null>(null);
  const [editItem, setEditItem] = useState<any>(null);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, title: string, message: string, onConfirm: () => void} | null>(null);

  // Profile State
  const [profileForm, setProfileForm] = useState<Profile>(props.profile);
  const [isProfileDirty, setIsProfileDirty] = useState(false);

  // Security State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Reset search on tab change
  useEffect(() => {
    setSearchQuery('');
    setNewPassword('');
    setConfirmPassword('');
  }, [activeTab]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  // Export Data
  const handleExport = () => {
    const data = {
      profile: props.profile,
      skills: props.skills,
      experiences: props.experiences,
      educations: props.educations,
      projects: props.projects,
      certifications: props.certifications,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Backup downloaded successfully');
  };

  // Import Data
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const triggerImport = () => {
    setConfirmModal({
        isOpen: true,
        title: 'Restore Data',
        message: 'Are you sure you want to restore data from a backup? This will overwrite all current content and cannot be undone.',
        onConfirm: () => {
            fileInputRef.current?.click();
            setConfirmModal(null);
        }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        props.onImportData(json);
        setProfileForm(json.profile || props.profile);
        showToast('Data restored successfully');
      } catch (err) {
        showToast('Invalid backup file', 'error');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
        showToast('Password must be at least 4 characters', 'error');
        return;
    }
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    props.onUpdatePassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast('Admin password updated successfully');
  };

  // Reordering Logic
  const moveItem = (type: string, index: number, direction: 'up' | 'down') => {
      const items = type === 'skills' ? [...props.skills] :
                    type === 'projects' ? [...props.projects] :
                    type === 'experience' ? [...props.experiences] :
                    type === 'education' ? [...props.educations] :
                    type === 'certifications' ? [...props.certifications] : [];
      
      if (direction === 'up' && index > 0) {
          [items[index], items[index - 1]] = [items[index - 1], items[index]];
      } else if (direction === 'down' && index < items.length - 1) {
          [items[index], items[index + 1]] = [items[index + 1], items[index]];
      } else {
          return;
      }

      if(type === 'skills') props.onReorderSkills(items as Skill[]);
      if(type === 'projects') props.onReorderProjects(items as Project[]);
      if(type === 'experience') props.onReorderExperiences(items as Experience[]);
      if(type === 'education') props.onReorderEducations(items as Education[]);
      if(type === 'certifications') props.onReorderCertifications(items as Certification[]);
  };

  const handleDelete = (type: string, idOrIndex: number) => {
      setConfirmModal({
          isOpen: true,
          title: 'Delete Item',
          message: 'Are you sure you want to delete this item? This action cannot be undone.',
          onConfirm: () => {
            if (type === 'skills') props.onDeleteSkill(idOrIndex);
            if (type === 'experience') props.onDeleteExperience(idOrIndex);
            if (type === 'projects') props.onDeleteProject(idOrIndex);
            if (type === 'education') props.onDeleteEducation(idOrIndex);
            if (type === 'certifications') props.onDeleteCertification(idOrIndex);
            setConfirmModal(null);
            showToast('Item deleted successfully');
          }
      });
  };

  // Navigation Tabs
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'system', label: 'Backup & Restore', icon: Database },
  ];

  // --- Renderers ---

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Projects" count={props.projects.length} color="bg-blue-500" icon={Code} onClick={() => setActiveTab('projects')} />
        <StatCard title="Skills" count={props.skills.length} color="bg-emerald-500" icon={Layers} onClick={() => setActiveTab('skills')} />
        <StatCard title="Experience" count={props.experiences.length} color="bg-amber-500" icon={Briefcase} onClick={() => setActiveTab('experience')} />
        <StatCard title="Certifications" count={props.certifications.length} color="bg-purple-500" icon={Award} onClick={() => setActiveTab('certifications')} />
      </div>
      
      <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back, {props.profile.name.split(' ')[0]}</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg">
            Manage your portfolio content directly from this dashboard. Use the sidebar to navigate between sections or use the quick stats above.
          </p>
          <div className="flex gap-4 mt-4 flex-wrap justify-center">
             <button onClick={() => setActiveTab('profile')} className="btn-secondary">Edit Profile</button>
             <button onClick={handleExport} className="btn-primary flex items-center gap-2"><Download size={16} /> Backup Data</button>
             <button onClick={props.onLogout} className="btn-secondary text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-900/30 flex items-center gap-2">
                 <LogOut size={16} /> Logout
             </button>
          </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl p-8 animate-in slide-in-from-right-5 shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b border-black dark:border-white/10 pb-4">
         <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
         {isProfileDirty && <span className="text-amber-500 text-sm font-medium flex items-center gap-1"><AlertCircle size={14} /> Unsaved Changes</span>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
              <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Profile Picture</label>
                  <ImageUpload 
                    value={profileForm.avatar || ''} 
                    onChange={base64 => { setProfileForm({...profileForm, avatar: base64}); setIsProfileDirty(true); }} 
                    className="w-full aspect-square rounded-2xl"
                  />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Resume / CV</label>
                <ResumeUpload 
                    value={profileForm.resumeUrl || ''} 
                    onChange={base64 => { setProfileForm({...profileForm, resumeUrl: base64}); setIsProfileDirty(true); }}
                />
              </div>
          </div>
          <div className="md:col-span-2 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Full Name" value={profileForm.name} onChange={v => { setProfileForm({...profileForm, name: v}); setIsProfileDirty(true); }} />
                <FormInput label="Current Role" value={profileForm.role} onChange={v => { setProfileForm({...profileForm, role: v}); setIsProfileDirty(true); }} />
                <FormInput label="Email Address" value={profileForm.email} onChange={v => { setProfileForm({...profileForm, email: v}); setIsProfileDirty(true); }} />
                <FormInput label="Phone Number" value={profileForm.phone} onChange={v => { setProfileForm({...profileForm, phone: v}); setIsProfileDirty(true); }} />
                <FormInput label="Location" value={profileForm.location} onChange={v => { setProfileForm({...profileForm, location: v}); setIsProfileDirty(true); }} />
                <FormInput label="Work Status" value={profileForm.status || ''} placeholder="e.g. Open to work" onChange={v => { setProfileForm({...profileForm, status: v}); setIsProfileDirty(true); }} />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Professional Summary</label>
                <textarea 
                    className="w-full bg-gray-50 dark:bg-black/30 border border-black dark:border-white/10 rounded-lg p-4 min-h-[120px] text-gray-900 dark:text-white focus:border-crimson outline-none transition-colors text-sm leading-relaxed resize-y"
                    value={profileForm.summary}
                    onChange={e => { setProfileForm({...profileForm, summary: e.target.value}); setIsProfileDirty(true); }}
                />
             </div>
             <div className="flex justify-end">
                <button 
                    onClick={() => { props.onUpdateProfile(profileForm); setIsProfileDirty(false); showToast('Profile updated successfully'); }}
                    className={`btn-primary flex items-center gap-2 ${!isProfileDirty && 'opacity-50'}`}
                    disabled={!isProfileDirty}
                >
                    <Save size={18} /> Save Changes
                </button>
             </div>
          </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
        <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="text-crimson" size={24} /> Security Settings
            </h3>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                <div>
                    <FormInput 
                        label="New Password" 
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword} 
                        onChange={setNewPassword} 
                    />
                </div>
                <div>
                    <FormInput 
                        label="Confirm Password" 
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword} 
                        onChange={setConfirmPassword} 
                    />
                </div>
                <div className="pt-4 flex justify-end">
                     <button type="submit" className="btn-primary" disabled={!newPassword}>Update Password</button>
                </div>
            </form>
        </div>
    </div>
  );

  const renderSystem = () => (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
       <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Download className="text-blue-500" size={20} /> Backup Data
            </h3>
            <p className="text-sm text-gray-500 mb-4">Download a JSON file containing all your profile, skills, projects, and experience data.</p>
            <button onClick={handleExport} className="btn-secondary w-full justify-center">Download Backup</button>
       </div>

       <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Upload className="text-green-500" size={20} /> Restore Data
            </h3>
            <p className="text-sm text-gray-500 mb-4">Upload a previously saved JSON backup to restore your portfolio content. <span className="text-crimson">This will replace current data.</span></p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
            <button onClick={triggerImport} className="btn-secondary w-full justify-center border-green-500/30 hover:bg-green-500/10 text-green-600 dark:text-green-400">Select Backup File</button>
       </div>
    </div>
  );

  const renderList = (type: Exclude<Tab, 'dashboard'|'system'|'profile'|'security'>, items: any[], titleKey: string, subKey?: string) => {
      const filteredItems = items.filter(item => {
          const mainText = item[titleKey]?.toString().toLowerCase() || '';
          const subText = subKey ? (item[subKey]?.toString().toLowerCase() || '') : '';
          return mainText.includes(searchQuery.toLowerCase()) || subText.includes(searchQuery.toLowerCase());
      });

      return (
        <div className="bg-white dark:bg-white/5 border border-black dark:border-white/10 rounded-xl overflow-hidden flex flex-col h-full animate-in slide-in-from-bottom-5 shadow-lg">
            <div className="p-6 border-b border-black dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50 dark:bg-white/5">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize whitespace-nowrap">{type} List</h2>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-black/20 border border-black dark:border-white/10 rounded-lg text-sm focus:border-crimson outline-none transition-colors"
                        />
                    </div>
                    <button onClick={() => { setModalType(type); setEditItem(null); setIsModalOpen(true); }} className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
                        <Plus size={16} /> Add New
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
                {filteredItems.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50 py-12">
                        <Search size={48} strokeWidth={1} />
                        <p className="mt-2 text-sm">No items found matching "{searchQuery}".</p>
                    </div>
                )}
                {filteredItems.map((item, idx) => (
                    <div key={item.id || idx} className="group flex items-center justify-between p-4 bg-white dark:bg-charcoalLight border border-black dark:border-white/5 rounded-lg hover:border-crimson/50 transition-all hover:shadow-md relative">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex flex-col gap-1 mr-2 opacity-50 group-hover:opacity-100">
                                  <button onClick={() => moveItem(type, idx, 'up')} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Move Up"><ArrowUp size={12}/></button>
                                  <button onClick={() => moveItem(type, idx, 'down')} className="p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Move Down"><ArrowDown size={12}/></button>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-sm shrink-0">
                                {(idx + 1).toString().padStart(2, '0')}
                            </div>
                            {/* Thumbnail for projects/certs */}
                            {item.image && (
                                <img src={item.image} alt="" className="w-10 h-10 rounded-md object-cover border border-black dark:border-white/10 bg-white" />
                            )}
                            <div className="min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white truncate">{item[titleKey]}</h4>
                                {subKey && <p className="text-xs text-gray-500 truncate">{item[subKey]}</p>}
                                {type === 'skills' && <p className="text-xs text-crimson font-mono mt-1">{item.level}% Proficiency</p>}
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0 ml-4">
                             <button onClick={() => { setModalType(type); setEditItem(type === 'skills' ? { ...item, index: idx } : item); setIsModalOpen(true); }} className="p-2 bg-gray-100 dark:bg-white/5 rounded text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white transition-colors" title="Edit">
                                <Edit2 size={16} />
                             </button>
                             <button onClick={() => handleDelete(type, type === 'skills' ? idx : item.id)} className="p-2 bg-gray-100 dark:bg-white/5 rounded text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                                <Trash2 size={16} />
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Sidebar Navigation */}
            <div className="space-y-2 lg:sticky lg:top-24 h-fit">
                <div className="flex justify-between items-center mb-4 px-4">
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dashboard Menu</h2>
                </div>
                
                {tabs.map(tab => (
                    <React.Fragment key={tab.id}>
                        {tab.id === 'system' && <div className="my-2 border-t border-black dark:border-white/10 mx-4"></div>}
                        <button 
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium group ${
                                activeTab === tab.id 
                                ? 'bg-crimson text-white shadow-lg shadow-crimson/25' 
                                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                            }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200'} /> 
                            {tab.label}
                            {activeTab === tab.id && <Check size={14} className="ml-auto" />}
                        </button>
                    </React.Fragment>
                ))}
                
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
                    <button 
                        onClick={props.onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 group"
                    >
                        <LogOut size={18} className="group-hover:text-red-600" /> 
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-h-[600px]">
                 {activeTab === 'dashboard' && renderDashboard()}
                 {activeTab === 'profile' && renderProfile()}
                 {activeTab === 'skills' && renderList('skills', props.skills, 'name')}
                 {activeTab === 'experience' && renderList('experience', props.experiences, 'role', 'company')}
                 {activeTab === 'education' && renderList('education', props.educations, 'degree', 'school')}
                 {activeTab === 'projects' && renderList('projects', props.projects, 'title')}
                 {activeTab === 'certifications' && renderList('certifications', props.certifications, 'name', 'issuer')}
                 {activeTab === 'security' && renderSecurity()}
                 {activeTab === 'system' && renderSystem()}
            </div>
        </div>

        {/* Edit/Add Modal */}
        {isModalOpen && modalType && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-[#1a1a1a] border border-black dark:border-white/10 rounded-2xl p-0 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
                     <div className="p-6 border-b border-black dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-white/5">
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                             {editItem ? <Edit2 size={20} /> : <Plus size={20} />}
                             {editItem ? 'Edit' : 'Add'} {modalType}
                         </h3>
                         <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"><X size={20} /></button>
                     </div>
                     
                     <div className="p-6">
                        <SettingsForm 
                            type={modalType} 
                            initialData={editItem} 
                            onClose={() => { setIsModalOpen(false); showToast('Changes saved successfully'); }} 
                            props={props}
                        />
                     </div>
                </div>
            </div>
        )}

        {/* Confirmation Modal */}
        {confirmModal && confirmModal.isOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white dark:bg-[#1a1a1a] border border-black dark:border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full text-red-600 dark:text-red-400">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{confirmModal.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{confirmModal.message}</p>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end mt-6">
                        <button onClick={() => setConfirmModal(null)} className="btn-secondary">Cancel</button>
                        <button onClick={confirmModal.onConfirm} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">Confirm</button>
                    </div>
                </div>
            </div>
        )}

        {/* Toast Notifications */}
        <div className="fixed bottom-6 right-6 z-[120] flex flex-col gap-3 pointer-events-none">
            {toasts.map(toast => (
                <div key={toast.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border animate-in slide-in-from-right-10 fade-in duration-300 ${
                    toast.type === 'success' 
                        ? 'bg-white dark:bg-[#1a1a1a] border-green-500 text-gray-900 dark:text-white' 
                        : 'bg-white dark:bg-[#1a1a1a] border-red-500 text-gray-900 dark:text-white'
                }`}>
                    {toast.type === 'success' ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
                    <span className="text-sm font-medium">{toast.text}</span>
                </div>
            ))}
        </div>

        <style>{`
            .btn-primary {
                @apply px-5 py-2.5 bg-crimson hover:bg-crimson-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed;
            }
            .btn-secondary {
                @apply px-5 py-2.5 bg-transparent border border-black dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg font-medium transition-all active:scale-95;
            }
        `}</style>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ title, count, color, icon: Icon, onClick }: any) => (
    <div onClick={onClick} className="bg-white dark:bg-white/5 border border-black dark:border-white/10 p-6 rounded-xl flex items-center justify-between cursor-pointer hover:border-crimson/50 transition-all hover:-translate-y-1 shadow-lg group">
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white">{count}</h4>
        </div>
        <div className={`w-12 h-12 rounded-full ${color} bg-opacity-10 flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
            <Icon size={24} className="text-gray-900 dark:text-white opacity-80" />
        </div>
    </div>
);

const FormInput = ({ label, value, onChange, placeholder, type="text" }: any) => (
    <div>
        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 tracking-wider">{label}</label>
        <input 
            type={type}
            className="w-full bg-gray-50 dark:bg-black/30 border border-black dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-crimson outline-none transition-colors text-sm font-medium placeholder:font-normal"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
        />
    </div>
);

const ImageUpload = ({ value, onChange, className }: { value: string, onChange: (v: string) => void, className?: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("File is too large. Please upload an image under 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    onChange(reader.result);
                }
            };
            reader.onerror = () => {
                alert("Failed to read file");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`relative border-2 border-dashed border-black dark:border-white/10 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center overflow-hidden hover:border-crimson transition-colors group cursor-pointer ${className}`} onClick={() => inputRef.current?.click()}>
            {value ? (
                <>
                    <img src={value} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                        Change Image
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center text-gray-500 gap-2 p-4">
                    <ImageIcon size={32} />
                    <span className="text-xs text-center">Click to Upload</span>
                </div>
            )}
            <input type="file" ref={inputRef} onChange={handleFile} accept="image/*" className="hidden" />
        </div>
    );
};

const ResumeUpload = ({ value, onChange, className }: { value: string, onChange: (v: string) => void, className?: string }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
             // 10MB limit for PDFs
            if (file.size > 10 * 1024 * 1024) {
                alert("File is too large. Please upload a PDF or Image under 10MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    onChange(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`relative border-2 border-dashed border-black dark:border-white/10 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center overflow-hidden hover:border-crimson transition-colors group cursor-pointer h-32 rounded-2xl ${className}`} onClick={() => inputRef.current?.click()}>
            {value ? (
                <div className="flex flex-col items-center text-green-600 dark:text-green-500 gap-2 p-4">
                    <FileText size={32} />
                    <span className="text-xs font-medium text-center">Resume Uploaded! <br/><span className="text-gray-500 text-[10px] font-normal">Click to replace</span></span>
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-500 gap-2 p-4">
                    <Upload size={32} />
                    <span className="text-xs text-center">Upload PDF or Image</span>
                </div>
            )}
             {value && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onChange(''); }}
                    className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50"
                    title="Remove Resume"
                >
                    <Trash2 size={14} />
                </button>
             )}
            <input type="file" ref={inputRef} onChange={handleFile} accept="application/pdf,image/*" className="hidden" />
        </div>
    );
};

const BulletListInput = ({ label, values, onChange }: { label: string, values: string[], onChange: (v: string[]) => void }) => {
    const add = () => onChange([...values, '']);
    const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
    const update = (idx: number, val: string) => {
        const newVals = [...values];
        newVals[idx] = val;
        onChange(newVals);
    };

    return (
        <div className="space-y-2">
            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{label}</label>
            {values.map((val, idx) => (
                <div key={idx} className="flex gap-2">
                     <input 
                        className="flex-1 bg-gray-50 dark:bg-black/30 border border-black dark:border-white/10 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-crimson outline-none text-sm"
                        value={val}
                        onChange={e => update(idx, e.target.value)}
                        placeholder="Description point..."
                     />
                     <button type="button" onClick={() => remove(idx)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><X size={18} /></button>
                </div>
            ))}
            <button type="button" onClick={add} className="text-xs font-bold text-crimson hover:text-crimson-600 flex items-center gap-1 mt-1"><Plus size={14} /> Add Point</button>
        </div>
    );
};

const SettingsForm = ({ type, initialData, onClose, props }: any) => {
    // Parse initial data safely
    const parseInitial = () => {
        const data = initialData || {};
        // Ensure arrays are arrays
        if (data.description && typeof data.description === 'string') data.description = [data.description];
        if (!data.description) data.description = [];
        
        if (data.tech && typeof data.tech === 'string') data.tech = data.tech.split(',').map((s: string) => s.trim());
        if (!data.tech) data.tech = [];
        return data;
    };

    const [formData, setFormData] = useState(parseInitial());

    const handleChange = (key: string, value: any) => setFormData({ ...formData, [key]: value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = formData.id || Date.now();
        const data = { ...formData, id };
        
        // Cleanup arrays for save
        if (data.description && Array.isArray(data.description)) data.description = data.description.filter((s:string) => s.trim() !== '');
        if (type === 'skills' && initialData?.index !== undefined) {
            props.onUpdateSkill(initialData.index, data);
        } else if (type === 'skills') {
            props.onAddSkill(data);
        } else if (type === 'experience') {
            initialData ? props.onUpdateExperience(id, data) : props.onAddExperience(data);
        } else if (type === 'education') {
            initialData ? props.onUpdateEducation(id, data) : props.onAddEducation(data);
        } else if (type === 'projects') {
            initialData ? props.onUpdateProject(id, data) : props.onAddProject(data);
        } else if (type === 'certifications') {
            initialData ? props.onUpdateCertification(id, data) : props.onAddCertification(data);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {type === 'skills' && (
                <>
                   <FormInput label="Skill Name" value={formData.name || ''} onChange={(v: any) => handleChange('name', v)} required />
                   <FormInput label="Proficiency (%)" type="number" value={formData.level || 50} onChange={(v: any) => handleChange('level', Number(v))} required />
                </>
            )}
            {type === 'experience' && (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Job Role" value={formData.role || ''} onChange={(v: any) => handleChange('role', v)} required />
                        <FormInput label="Company" value={formData.company || ''} onChange={(v: any) => handleChange('company', v)} required />
                    </div>
                    <FormInput label="Period (e.g. 2024 - Present)" value={formData.period || ''} onChange={(v: any) => handleChange('period', v)} required />
                    <BulletListInput label="Key Achievements / Responsibilities" values={formData.description} onChange={v => handleChange('description', v)} />
                </>
            )}
            {type === 'education' && (
                <>
                    <FormInput label="Degree" value={formData.degree || ''} onChange={(v: any) => handleChange('degree', v)} required />
                    <FormInput label="School / University" value={formData.school || ''} onChange={(v: any) => handleChange('school', v)} required />
                    <FormInput label="Period" value={formData.period || ''} onChange={(v: any) => handleChange('period', v)} required />
                    <FormInput label="Additional Info" value={formData.description || ''} onChange={(v: any) => handleChange('description', v)} />
                </>
            )}
            {type === 'projects' && (
                <>
                    <FormInput label="Project Title" value={formData.title || ''} onChange={(v: any) => handleChange('title', v)} required />
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Tech Stack</label>
                        <input 
                             className="w-full bg-gray-50 dark:bg-black/30 border border-black dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:border-crimson outline-none text-sm"
                             placeholder="e.g. React, Node.js (comma separated)"
                             value={Array.isArray(formData.tech) ? formData.tech.join(', ') : formData.tech || ''}
                             onChange={e => handleChange('tech', e.target.value.split(',').map(s => s.trimStart()))}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Live Link" value={formData.link || ''} onChange={(v: any) => handleChange('link', v)} />
                        <FormInput label="GitHub URL" value={formData.github || ''} onChange={(v: any) => handleChange('github', v)} />
                    </div>
                    
                    <div className="space-y-2 pt-2">
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">Project Image</label>
                        <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-3">
                                     <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Image URL</label>
                                        <input 
                                            type="text" 
                                            placeholder="https://..." 
                                            value={!formData.image?.startsWith('data:') ? (formData.image || '') : ''}
                                            onChange={e => handleChange('image', e.target.value)}
                                            disabled={!!formData.image?.startsWith('data:')}
                                            className="w-full bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-crimson disabled:opacity-50"
                                        />
                                     </div>
                                     <div className="flex items-center gap-3">
                                        <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">OR</span>
                                        <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                                     </div>
                                     <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-2">Upload local file (max 5MB)</p>
                                        {formData.image?.startsWith('data:') && (
                                            <button 
                                                type="button"
                                                onClick={() => handleChange('image', '')}
                                                className="text-xs text-red-500 hover:underline font-medium flex items-center justify-center gap-1"
                                            >
                                                <Trash2 size={12} /> Clear Upload
                                            </button>
                                        )}
                                     </div>
                                </div>
                                
                                <ImageUpload 
                                    value={formData.image || ''} 
                                    onChange={v => handleChange('image', v)} 
                                    className="w-full h-40 rounded-lg shadow-inner bg-white dark:bg-black/20"
                                />
                            </div>
                        </div>
                    </div>

                    <BulletListInput label="Project Description" values={formData.description} onChange={v => handleChange('description', v)} />
                </>
            )}
            {type === 'certifications' && (
                <>
                    <FormInput label="Certification Name" value={formData.name || ''} onChange={(v: any) => handleChange('name', v)} required />
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput label="Issuer" value={formData.issuer || ''} onChange={(v: any) => handleChange('issuer', v)} required />
                        <FormInput label="Year" value={formData.year || ''} onChange={(v: any) => handleChange('year', v)} required />
                    </div>
                    <FormInput label="Credential URL" value={formData.link || ''} onChange={(v: any) => handleChange('link', v)} />
                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 tracking-wider">Badge/Certificate Image</label>
                    <ImageUpload value={formData.image || ''} onChange={v => handleChange('image', v)} className="w-full h-48 rounded-lg" />
                </>
            )}
            <div className="pt-4 flex gap-4 border-t border-gray-200 dark:border-white/10 mt-4">
                <button type="button" onClick={onClose} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">Save Details</button>
            </div>
        </form>
    );
}

export default SettingsPage;
