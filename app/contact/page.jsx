'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { isDark } = useTheme();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Contact from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:spellspiritual76@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <PageNav />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Mail className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Contact</h1>
          </div>

          <div className="mb-12">
            <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-lg`}>
              Have questions, collaboration ideas, or just want to discuss AI research?
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className={`${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-xl p-8`}>
            <div className="mb-6">
              <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 border rounded-lg focus:outline-none transition-colors`}
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 border rounded-lg focus:outline-none transition-colors`}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                Message
              </label>
              <textarea
                id="message"
                required
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 border rounded-lg focus:outline-none transition-colors resize-none`}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/50 inline-flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={isDark ? 'text-neutral-500' : 'text-neutral-600'}>
              Or email Spiritual Spell (Vichaps) directly at{' '}
              <a href="mailto:spellspiritual76@gmail.com" className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors">
                spellspiritual76@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
