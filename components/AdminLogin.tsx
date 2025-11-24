
import React, { useState } from 'react';
import { Lock, ArrowLeft, KeyRound, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  isSetupMode: boolean;
  onLogin: (password: string) => boolean;
  onSignup: (password: string) => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isSetupMode, onLogin, onSignup, onCancel }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSetupMode) {
        if (password.length < 4) {
            setError('Password must be at least 4 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        onSignup(password);
    } else {
        if (onLogin(password)) {
            setError('');
        } else {
            setError('Incorrect password.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-4 transition-colors duration-300 pt-20">
      <div className="max-w-md w-full bg-white dark:bg-[#151515] rounded-2xl shadow-2xl border border-black dark:border-white/10 p-8 md:p-12 animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-crimson/10 text-crimson rounded-full flex items-center justify-center mx-auto mb-4 border border-crimson/20">
            {isSetupMode ? <UserPlus size={32} /> : <Lock size={32} />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSetupMode ? 'Create Admin Account' : 'Admin Access'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            {isSetupMode 
                ? 'Set a secure password to manage your portfolio.' 
                : 'Restricted area. Please enter your access key.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className={`w-full bg-gray-50 dark:bg-black/30 border ${error ? 'border-red-500' : 'border-black dark:border-white/10'} rounded-xl px-12 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-crimson transition-all placeholder:text-gray-500`}
              placeholder={isSetupMode ? "Create Password" : "Enter Password"}
              autoFocus
            />
          </div>

          {isSetupMode && (
            <div className="relative animate-in slide-in-from-top-2 fade-in">
                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                className={`w-full bg-gray-50 dark:bg-black/30 border ${error ? 'border-red-500' : 'border-black dark:border-white/10'} rounded-xl px-12 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-crimson transition-all placeholder:text-gray-500`}
                placeholder="Confirm Password"
                />
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-1">
                <AlertCircle size={14} className="text-red-500" />
                <p className="text-red-500 text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-crimson hover:bg-crimson-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 mt-2"
          >
            {isSetupMode ? 'Create Account' : 'Unlock Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
            <button 
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm flex items-center justify-center gap-2 transition-colors mx-auto"
            >
                <ArrowLeft size={14} /> Back to Portfolio
            </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
