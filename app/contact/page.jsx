'use client';

import { useState } from 'react';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

/* ── Custom SVG Icons ── */
const TwitterBird = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 5.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41z" />
  </svg>
);

const RedditIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { isDark } = useTheme();

  const card = `${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-xl`;
  const bodyText = isDark ? 'text-neutral-300' : 'text-neutral-700';

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

      <main id="main-content" className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Connect ── */}
          <div className={`${card} p-8 mb-12`}>
            <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-yellow-500 mb-6">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { href: 'https://github.com/Goochbeater/Spiritual-Spell-Red-Teaming', icon: Github, label: 'GitHub' },
                { href: 'https://x.com/Ubannoblesse', icon: TwitterBird, label: 'X / Twitter', animated: true },
                { href: 'https://www.reddit.com/r/ClaudeAIJailbreak/', icon: RedditIcon, label: 'Reddit' },
                { href: 'mailto:spellspiritual76@gmail.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label, animated }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className={`flex items-center gap-3 px-5 py-3 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'} border hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group`}
                >
                  <span className={animated ? 'inline-block animate-bird-fly' : ''}>
                    <Icon size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                  </span>
                  <span className={`text-sm font-medium ${bodyText} group-hover:text-yellow-500 transition-colors`}>
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-12">
            <Mail className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">Contact</h1>
          </div>

          <div className="mb-12">
            <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-lg`}>
              Have questions, collaboration ideas, or just want to discuss AI research?
              Send me a message and I&apos;ll get back to you as soon as possible.
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all`}
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all`}
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white' : 'bg-white border-neutral-300 text-black'} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all resize-none`}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="group w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/50 inline-flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
      </main>
    </div>
  );
}
