
import React, { useRef } from 'react';
import { Profile } from '../types';
import { Download, Upload, FileText, CheckCircle, RefreshCw } from 'lucide-react';

interface ResumePageProps {
  profile: Profile;
  onUpdateProfile: (profile: Profile) => void;
}

const ResumePage: React.FC<ResumePageProps> = ({ profile, onUpdateProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB Limit
        alert("File is too large. Please upload a file smaller than 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onUpdateProfile({ ...profile, resumeUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input to allow re-uploading same file
    e.target.value = '';
  };

  // Helper to determine extension from base64 mime type
  const getExtensionAndMime = (dataUrl: string) => {
    const mime = dataUrl.match(/^data:(.*);base64,/)?.[1] || '';
    let ext = 'pdf';
    if (mime.includes('image/jpeg')) ext = 'jpg';
    else if (mime.includes('image/png')) ext = 'png';
    else if (mime.includes('image/webp')) ext = 'webp';
    return { ext, mime };
  };

  const handleDownload = () => {
    if (!profile.resumeUrl) return;
    
    const { ext } = getExtensionAndMime(profile.resumeUrl);
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = `${profile.name.replace(/\s+/g, '_')}_Resume.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasResume = !!profile.resumeUrl;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0a0a0a] pt-32 pb-12 transition-colors duration-300 flex items-center justify-center px-6">
      
      <div className="max-w-lg w-full">
        <div className="bg-white dark:bg-[#151515] rounded-2xl shadow-2xl border border-black dark:border-white/10 p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
          
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 transition-colors ${hasResume ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500' : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                {hasResume ? <CheckCircle size={48} strokeWidth={1.5} /> : <FileText size={48} strokeWidth={1.5} />}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {hasResume ? 'Resume Available' : 'No Resume Uploaded'}
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-sm mx-auto">
                {hasResume 
                    ? 'Your professional resume is uploaded and ready for download.' 
                    : 'Upload your latest CV or resume to make it available for download.'}
            </p>

            <div className="space-y-4">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileUpload} 
                    accept="application/pdf,image/*" 
                    className="hidden" 
                />

                {hasResume ? (
                    <>
                        <button 
                            onClick={handleDownload}
                            className="w-full py-4 bg-crimson hover:bg-crimson-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            <Download size={20} /> Download Resume
                        </button>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} /> Replace File
                        </button>
                    </>
                ) : (
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full py-4 bg-crimson hover:bg-crimson-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <Upload size={20} /> Upload Resume
                    </button>
                )}
            </div>

            {hasResume && (
                 <p className="mt-8 text-xs text-gray-400">
                    Supported formats: PDF, PNG, JPG
                 </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
