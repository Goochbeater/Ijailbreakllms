'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Mail, ArrowRight, Infinity } from 'lucide-react';
import { InfiniteSlider } from '@/components/infinite-slider';

export function ClientHomePage({ initialPosts, initialJailbreaks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Contact from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:spiritualspell76@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const sliderImages = [
    "https://i.imgur.com/2UdcRcx.jpeg",
    "https://i.imgur.com/ssZMv8L.jpeg",
    "https://i.imgur.com/ZZc3TMh.jpeg",
    "https://i.imgur.com/tCm38XL.jpeg",
    "https://i.imgur.com/IWeytLJ.jpeg",
    "https://i.imgur.com/M8YGR1R.jpeg",
    "https://i.imgur.com/T8QMOQj.jpeg",
    "https://i.imgur.com/U3qLzVB.jpeg",
    "https://i.imgur.com/jyoZSMq.jpeg",
    "https://i.imgur.com/oQ9b36D.jpeg",
    "https://i.imgur.com/FJj6ZRd.jpeg",
  ];

  const imageElements = sliderImages.map((url, index) => (
    <div key={`${url}-${index}`} className="flex items-center justify-center shrink-0">
      <img
        className="h-32 w-auto sm:h-40 md:h-48 object-cover rounded-lg opacity-90 hover:opacity-100 transition-opacity"
        src={url}
        alt={`Slider image ${index + 1}`}
      />
    </div>
  ));

  const latestPost = initialPosts[0];
  const latestJailbreak = initialJailbreaks[0];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              JailbreakLLMs
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Home</Link>
              <Link href="/blog" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Blog</Link>
              <Link href="/jailbreaks" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreaks</Link>
              <Link href="/about" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>About</Link>
              <Link href="/contact" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Contact</Link>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 py-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="flex flex-col gap-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Home</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Blog</Link>
                <Link href="/jailbreaks" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreaks</Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>About</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Contact</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Infinite Slider */}
      <div className="pt-20">
        <InfiniteSlider speedOnHover={1} speed={3} gap={30}>
          {imageElements}
        </InfiniteSlider>
      </div>

      {/* Hero Section with Infinity Symbol */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Infinity size={80} className="text-yellow-500 animate-bounce" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Jailbreak LLMs with Spiritual-Spell-
          </h1>
          <p className={`text-lg md:text-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'} max-w-2xl mx-auto`}>
            Exploring the boundaries of AI through creative prompt engineering
          </p>
        </div>
      </section>

      {/* Latest Content Cards */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Latest Blog Post */}
          {latestPost && (
            <Link
              href={`/blog/${latestPost.slug}`}
              className={`group p-8 ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'} border ${isDark ? 'border-neutral-800 hover:border-yellow-500' : 'border-neutral-200 hover:border-yellow-600'} rounded-xl transition-all hover:shadow-lg ${isDark ? 'hover:shadow-yellow-500/20' : 'hover:shadow-yellow-600/20'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                  Latest Article
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-500">{latestPost.readingTime} min read</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                {latestPost.title}
              </h3>
              <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} mb-4 line-clamp-3`}>
                {latestPost.excerpt || latestPost.content.substring(0, 150) + '...'}
              </p>
              <div className="flex items-center gap-2 text-yellow-500 font-semibold">
                Read more <ArrowRight size={16} />
              </div>
            </Link>
          )}

          {/* Latest Jailbreak */}
          {latestJailbreak && (
            <Link
              href={`/jailbreaks/${latestJailbreak.slug}`}
              className={`group p-8 ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'} border ${isDark ? 'border-neutral-800 hover:border-yellow-500' : 'border-neutral-200 hover:border-yellow-600'} rounded-xl transition-all hover:shadow-lg ${isDark ? 'hover:shadow-yellow-500/20' : 'hover:shadow-yellow-600/20'}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                  Latest Jailbreak
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-500">{latestJailbreak.readingTime} min read</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors">
                {latestJailbreak.title}
              </h3>
              <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} mb-4 line-clamp-3`}>
                {latestJailbreak.excerpt || latestJailbreak.content.substring(0, 150) + '...'}
              </p>
              <div className="flex items-center gap-2 text-yellow-500 font-semibold">
                Read more <ArrowRight size={16} />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-yellow-500" size={32} />
              <h2 className="text-3xl md:text-4xl font-black">Get In Touch</h2>
            </div>
            <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
              Have questions or want to collaborate? Send me a message!
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className={`${isDark ? 'bg-neutral-950' : 'bg-neutral-50'} border ${isDark ? 'border-neutral-800' : 'border-neutral-200'} rounded-xl p-8`}>
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} border rounded-lg focus:outline-none transition-colors`}
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} border rounded-lg focus:outline-none transition-colors`}
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
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} border rounded-lg focus:outline-none transition-colors resize-none`}
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
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={isDark ? 'text-neutral-500' : 'text-neutral-600'}>
            &copy; {new Date().getFullYear()} Jailbreak LLMs with Spiritual-Spell-. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
