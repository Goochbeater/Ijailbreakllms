'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, BookOpen, Menu, X, Sun, Moon, ChevronDown, ArrowUp, Github, Twitter, Mail, User } from 'lucide-react';
import { InfiniteSlider } from '@/components/infinite-slider';

export function ClientHomePage({ initialPosts, initialJailbreaks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }

    // Handle scroll for back to top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Update document class and localStorage
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const models = [
    { id: 'chatgpt', name: 'ChatGPT', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { id: 'claude', name: 'Claude', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg' },
    { id: 'gemini', name: 'Gemini', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg' },
    { id: 'llama', name: 'Llama', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png' },
    { id: 'mistral', name: 'Mistral', imageUrl: 'https://mistral.ai/images/logo_hubc88c4ece131b91c7cb753f40e9e1cc5_2589_256x0_resize_lanczos_3.png' },
  ];

  const modelImages = models.map((model, index) => (
    <div key={`${model.id}-${index}`} className="flex items-center justify-center shrink-0">
      <img
        className="h-6 w-auto sm:h-8 md:h-10 lg:h-12 object-contain rounded opacity-80 hover:opacity-100 transition-opacity"
        src={model.imageUrl}
        alt={`${model.name} Logo`}
      />
    </div>
  ));

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-neutral-800/30' : 'border-neutral-200'} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#hero" className="text-xl font-black bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              JailbreakLLMs
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#blog" className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}>Blog</a>
              <a href="#jailbreaks" className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}>Jailbreaks</a>
              <a href="#about" className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}>About</a>
              <a href="#contact" className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}>Contact</a>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-emerald-400" /> : <Moon size={20} className="text-emerald-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-emerald-400" /> : <Moon size={20} className="text-emerald-600" />}
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
                <a
                  href="#blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}
                >
                  Blog
                </a>
                <a
                  href="#jailbreaks"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}
                >
                  Jailbreaks
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}
                >
                  About
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors font-medium`}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Pulsing Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Infinite Slider with LLM Logos */}
          <div className="mb-12">
            <InfiniteSlider speedOnHover={2} speed={5} gap={20}>
              {modelImages}
            </InfiniteSlider>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent leading-tight">
            Jailbreak LLMs with Spiritual-Spell-
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'} mb-12 max-w-2xl mx-auto`}>
            Exploring the edges of AI, prompt engineering, and the art of breaking boundaries
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#blog"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Read Articles <ArrowRight size={18} />
            </a>
            <a
              href="#jailbreaks"
              className={`px-8 py-4 ${isDark ? 'bg-neutral-950 hover:bg-neutral-900 border-neutral-800/50' : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300'} border text-${isDark ? 'white' : 'black'} font-bold rounded-xl transition-colors inline-flex items-center gap-2`}
            >
              Jailbreak Research <Shield size={18} />
            </a>
          </div>

          {/* Floating Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#blog" className={`${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'} transition-colors`}>
              <ChevronDown size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <BookOpen className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black">Latest Articles</h2>
          </div>

          {initialPosts.length === 0 ? (
            <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>No articles yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group p-6 ${isDark ? 'bg-neutral-950 border-neutral-800/50 hover:border-emerald-500/50' : 'bg-neutral-50 border-neutral-200 hover:border-emerald-400'} border rounded-xl transition-all`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase">
                      {post.type || 'Article'}
                    </span>
                    <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>•</span>
                    <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{post.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-sm mb-4 line-clamp-2`}>
                    {post.excerpt || post.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    Read more <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Jailbreaks Section */}
      <section id="jailbreaks" className={`py-20 px-6 ${isDark ? 'bg-neutral-950/50' : 'bg-neutral-100/50'} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Shield className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black">Jailbreak Research</h2>
          </div>

          {initialJailbreaks.length === 0 ? (
            <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>No jailbreak research yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialJailbreaks.map((jailbreak) => (
                <Link
                  key={jailbreak.slug}
                  href={`/jailbreaks/${jailbreak.slug}`}
                  className={`group p-6 ${isDark ? 'bg-black border-neutral-800/50 hover:border-emerald-500/50' : 'bg-white border-neutral-200 hover:border-emerald-400'} border rounded-xl transition-all`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-emerald-400 uppercase">
                      {jailbreak.type || 'Research'}
                    </span>
                    <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>•</span>
                    <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{jailbreak.readingTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                    {jailbreak.title}
                  </h3>
                  <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-600'} text-sm mb-4 line-clamp-2`}>
                    {jailbreak.excerpt || jailbreak.content.substring(0, 120) + '...'}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    Read more <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <User className="text-emerald-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-black">About Me</h2>
          </div>
          <div className={`${isDark ? 'bg-neutral-950' : 'bg-neutral-50'} border ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} rounded-xl p-8 mb-8`}>
            <p className={`text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} mb-6 leading-relaxed`}>
              I'm a researcher and enthusiast exploring the boundaries of AI systems through creative prompt engineering and jailbreak techniques.
              My work focuses on understanding the limitations and capabilities of large language models, pushing the boundaries of what's possible
              while advocating for responsible AI development.
            </p>
            <p className={`text-lg ${isDark ? 'text-neutral-300' : 'text-neutral-700'} leading-relaxed`}>
              Through this blog, I share my findings, techniques, and insights into the fascinating world of AI prompt engineering and security research.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} border ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} rounded-xl transition-colors group`}
              aria-label="GitHub"
            >
              <Github size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} border ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} rounded-xl transition-colors group`}
              aria-label="Twitter"
            >
              <Twitter size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:contact@example.com"
              className={`p-4 ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} border ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} rounded-xl transition-colors group`}
              aria-label="Email"
            >
              <Mail size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 ${isDark ? 'bg-neutral-950/50' : 'bg-neutral-100/50'} relative z-10`}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="text-emerald-400" size={32} />
              <h2 className="text-4xl md:text-5xl font-black">Get In Touch</h2>
            </div>
            <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
              Have questions or want to collaborate? Send me a message!
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className={`${isDark ? 'bg-black' : 'bg-white'} border ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} rounded-xl p-8`}>
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-black'} border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors`}
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-black'} border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors`}
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-300 text-black'} border rounded-lg focus:outline-none focus:border-emerald-500 transition-colors resize-none`}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} relative z-10`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={isDark ? 'text-neutral-500' : 'text-neutral-600'}>
            &copy; {new Date().getFullYear()} Jailbreak LLMs with Spiritual-Spell-. Exploring the edges of AI.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-emerald-500 hover:bg-emerald-600 text-black rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
