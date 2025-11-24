
import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, ArrowRight } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the mailto link
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:${RESUME_DATA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-charcoal transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 animate-in slide-in-from-bottom-5">
            <h3 className="text-crimson font-bold tracking-widest uppercase text-xs mb-2 flex items-center justify-center gap-2">
                <Mail size={16} /> Get in Touch
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Me</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                Have a project in mind or want to discuss data analytics? Fill out the details below and I'll get back to you.
            </p>
        </div>

        <div className="bg-gray-50 dark:bg-charcoalLight rounded-2xl p-8 md:p-12 border border-black dark:border-white/5 shadow-xl shadow-crimson/5">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-2">
                            <User size={14} /> Your Name
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-white dark:bg-black/20 border border-black dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-crimson outline-none transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-2">
                            <Mail size={14} /> Your Email
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-white dark:bg-black/20 border border-black dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-crimson outline-none transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-2">
                        <MessageSquare size={14} /> Message
                    </label>
                    <textarea 
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white dark:bg-black/20 border border-black dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:border-crimson outline-none transition-colors resize-none"
                        placeholder="How can I help you?"
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    className="w-full py-4 bg-crimson hover:bg-crimson-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-crimson/25 hover:shadow-crimson/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                    Send Message <Send size={18} />
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                    This will open your default email client to send the message to <span className="text-crimson">{RESUME_DATA.email}</span>.
                </p>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
