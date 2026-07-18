'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  Mail,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  MousePointerClick,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import { InfiniteSlider } from '@/components/infinite-slider';
import { GlitchLink } from '@/components/glitch-link';
import { PhysicsLogo } from '@/components/physics-logo';
import { useTheme } from '@/app/layout';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ClientHomePage({ initialPosts, initialJailbreaks }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { isDark, toggle } = useTheme();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Contact from ' + formData.name);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:spellspiritual76@gmail.com?subject=${subject}&body=${body}`;
    setFormData({ name: '', email: '', message: '' });
  };

  const sliderImages = [
    { url: 'https://i.imgur.com/2UdcRcx.jpeg', alt: 'Anthropic' },
    { url: 'https://i.imgur.com/ssZMv8L.jpeg', alt: 'ChatGPT' },
    { url: 'https://i.imgur.com/ZZc3TMh.jpeg', alt: 'Gemini' },
    { url: 'https://i.imgur.com/tCm38XL.jpeg', alt: 'Mistral AI' },
    { url: 'https://i.imgur.com/IWeytLJ.jpeg', alt: 'DeepMind' },
    { url: 'https://i.imgur.com/M8YGR1R.jpeg', alt: 'Meta' },
    { url: 'https://i.imgur.com/T8QMOQj.jpeg', alt: 'Perplexity' },
    { url: 'https://i.imgur.com/U3qLzVB.jpeg', alt: 'Cohere' },
    { url: 'https://i.imgur.com/jyoZSMq.jpeg', alt: 'Hugging Face' },
    { url: 'https://i.imgur.com/oQ9b36D.jpeg', alt: 'Nvidia' },
    { url: 'https://i.imgur.com/FJj6ZRd.jpeg', alt: 'Stability AI' },
  ];

  const imageElements = sliderImages.map((img, index) => (
    <div key={`${img.url}-${index}`} className="flex items-center justify-center shrink-0">
      <img
        className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain rounded opacity-80 hover:opacity-100 transition-opacity"
        src={img.url}
        alt={img.alt}
      />
    </div>
  ));

  const latestPost = initialPosts[0];
  const latestJailbreak = initialJailbreaks[0];
  const morePosts = initialPosts.slice(1, 4);
  const moreJailbreaks = initialJailbreaks.slice(1, 4);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/jailbreaks', label: 'Jailbreak Articles' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const featuredCards = [
    latestPost && {
      item: latestPost,
      href: `/blog/${latestPost.slug}`,
      tag: 'Latest Article',
      icon: BookOpen,
    },
    latestJailbreak && {
      item: latestJailbreak,
      href: `/jailbreaks/${latestJailbreak.slug}`,
      tag: 'Latest Jailbreak',
      icon: FlaskConical,
    },
  ].filter(Boolean);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      {/* Sticky Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl border-b ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <GlitchLink href="/" className="text-xl font-black bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent" interval={15000}>
              JailbreakLLMs
            </GlitchLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map((l) => (
                <Link key={l.href} href={l.href} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>{l.label}</Link>
              ))}
              <Link href="/jailbreaks" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreak Articles</Link>
              <GlitchLink href="/repository" className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreak Repo</GlitchLink>
              {navLinks.slice(3).map((l) => (
                <Link key={l.href} href={l.href} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>{l.label}</Link>
              ))}
              <button
                onClick={toggle}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950 hover:bg-neutral-900' : 'bg-neutral-100 hover:bg-neutral-200'} transition-colors`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={toggle}
                className={`p-2 rounded-lg ${isDark ? 'bg-neutral-950' : 'bg-neutral-100'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ${isDark ? 'text-white' : 'text-black'}`}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div
              id="mobile-menu"
              className={`md:hidden mt-4 py-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}
            >
              <div className="flex flex-col gap-4">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Home</Link>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Blog</Link>
                <Link href="/jailbreaks" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreak Articles</Link>
                <GlitchLink href="/repository" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Jailbreak Repo</GlitchLink>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>About</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-neutral-400 hover:text-yellow-500' : 'text-neutral-600 hover:text-yellow-600'} transition-colors font-medium`}>Contact</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero — interactive physics wordmark */}
      <section id="main-content" className="relative overflow-hidden">
        {/* ambient grid + gold glow */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-grid-dark' : 'bg-grid-light'} [mask-image:radial-gradient(ellipse_65%_60%_at_50%_38%,black,transparent)]`} />
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 h-72 w-[46rem] max-w-[90vw] rounded-full bg-yellow-500/15 blur-[130px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 pt-32 md:pt-40 pb-16 md:pb-20 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' : 'border-yellow-600/30 bg-yellow-500/10 text-yellow-700'}`}
          >
            <Sparkles size={14} />
            LLM red-teaming · prompt engineering
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-8">
            <PhysicsLogo text="JailbreakLLMs" className="mx-auto max-w-3xl h-28 sm:h-36 md:h-44" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className={`mt-8 text-lg md:text-xl ${isDark ? 'text-neutral-400' : 'text-neutral-600'} max-w-2xl mx-auto text-balance`}
          >
            Exploring the boundaries of AI through creative prompt engineering —{' '}
            <span className="gradient-text font-semibold">Spiritual Spell (Vichaps)</span>
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-7 py-3.5 font-bold text-black transition-all hover:from-yellow-400 hover:to-yellow-500 hover:shadow-lg hover:shadow-yellow-500/40"
            >
              Read the Blog
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/jailbreaks"
              className={`inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 font-bold transition-all ${isDark ? 'border-neutral-800 text-neutral-200 hover:border-yellow-500/60 hover:text-yellow-400' : 'border-neutral-300 text-neutral-700 hover:border-yellow-600/60 hover:text-yellow-700'}`}
            >
              Explore Jailbreaks
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className={`mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}
          >
            <MousePointerClick size={14} className="text-yellow-500/80" />
            swipe · drag · spin the logo — it springs back
          </motion.p>
        </div>
      </section>

      {/* Logo slider strip */}
      <section className={`relative border-y ${isDark ? 'border-neutral-800/50 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-50'} py-10`}>
        <p className={`mb-8 text-center text-xs font-semibold uppercase tracking-[0.3em] ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
          Models & platforms put to the test
        </p>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="relative w-full overflow-hidden">
            <InfiniteSlider speedOnHover={2} speed={5} gap={20}>
              {imageElements}
            </InfiniteSlider>
            <div className={`pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r ${isDark ? 'from-black' : 'from-neutral-50'} to-transparent z-10`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l ${isDark ? 'from-black' : 'from-neutral-50'} to-transparent z-10`} />
          </div>
        </div>
      </section>

      {/* Latest content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500 mb-3">Fresh off the bench</p>
              <h2 className="text-3xl md:text-4xl font-black">Latest research & write-ups</h2>
            </div>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-yellow-500 hover:text-yellow-400 transition-colors">
              View everything
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Featured cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCards.map(({ item, href, tag, icon: Icon }, idx) => (
              <motion.div
                key={href}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                custom={idx}
              >
                <Link
                  href={href}
                  className={`group relative flex h-full flex-col overflow-hidden isolate ${!item.coverImage ? (isDark ? 'bg-neutral-950' : 'bg-neutral-50') : ''} border ${isDark ? 'border-neutral-800/80 hover:border-yellow-500/70' : 'border-neutral-200 hover:border-yellow-600/70'} rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isDark ? 'hover:shadow-yellow-500/10' : 'hover:shadow-yellow-600/10'}`}
                >
                  {item.coverImage && (
                    <>
                      <img
                        src={item.coverImage}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                      />
                      <div
                        aria-hidden="true"
                        className={`absolute inset-0 -z-10 ${isDark ? 'bg-black/50 group-hover:bg-black/35' : 'bg-white/50 group-hover:bg-white/35'} backdrop-blur-[3px] transition-colors duration-500`}
                      />
                    </>
                  )}
                  <div className="relative flex h-full flex-col p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon size={16} className="text-yellow-500" />
                      <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider drop-shadow">
                        {tag}
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span className={`text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>{item.readingTime} min read</span>
                      {formatDate(item.date) && (
                        <>
                          <span className="text-neutral-400">•</span>
                          <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{formatDate(item.date)}</span>
                        </>
                      )}
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors ${isDark ? 'text-white' : 'text-black'} drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}>
                      {item.title}
                    </h3>
                    <p className={`${isDark ? 'text-neutral-200' : 'text-neutral-700'} mb-6 line-clamp-3`}>
                      {item.excerpt || item.content.substring(0, 150) + '...'}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-yellow-500 font-semibold drop-shadow">
                      Read more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent rows */}
          {(morePosts.length > 0 || moreJailbreaks.length > 0) && (
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {[
                { title: 'More from the blog', items: morePosts, base: '/blog' },
                { title: 'More jailbreaks', items: moreJailbreaks, base: '/jailbreaks' },
              ].map(
                (group, gi) =>
                  group.items.length > 0 && (
                    <motion.div
                      key={group.title}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-60px' }}
                      custom={gi}
                      className={`rounded-2xl border ${isDark ? 'border-neutral-800/80 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50'} p-6`}
                    >
                      <h3 className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {group.title}
                      </h3>
                      <div className={`divide-y ${isDark ? 'divide-neutral-800/70' : 'divide-neutral-200'}`}>
                        {group.items.map((item) => (
                          <Link
                            key={item.slug}
                            href={`${group.base}/${item.slug}`}
                            className="group flex items-center justify-between gap-4 py-3.5"
                          >
                            <div className="min-w-0">
                              <p className={`truncate font-semibold group-hover:text-yellow-500 transition-colors ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                                {item.title}
                              </p>
                              <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                {[formatDate(item.date), `${item.readingTime} min read`].filter(Boolean).join(' · ')}
                              </p>
                            </div>
                            <ArrowUpRight
                              size={18}
                              className={`shrink-0 transition-all group-hover:text-yellow-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}
                            />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[36rem] max-w-[90vw] rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${isDark ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-500/10 border border-yellow-600/30'}`}>
                <Mail className="text-yellow-500" size={22} />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Get in touch</h2>
            <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
              Questions, collabs, or a jailbreak I should see? Send me a message.
            </p>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            custom={1}
            onSubmit={handleFormSubmit}
            className={`${isDark ? 'bg-neutral-950/80 border-neutral-800' : 'bg-white border-neutral-200'} backdrop-blur border rounded-2xl p-8 shadow-xl ${isDark ? 'shadow-black/40' : 'shadow-neutral-200'}`}
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all`}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all`}
                  placeholder="your.email@example.com"
                />
              </div>
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
                className={`w-full px-4 py-3 ${isDark ? 'bg-black border-neutral-800 text-white focus:border-yellow-500' : 'bg-white border-neutral-300 text-black focus:border-yellow-600'} focus:ring-2 focus:ring-yellow-500/50 border rounded-lg focus:outline-none transition-all resize-none`}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="group w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/50 inline-flex items-center justify-center gap-2"
            >
              Send Message <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${isDark ? 'border-neutral-800/50' : 'border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`${isDark ? 'text-neutral-500 hover:text-yellow-500' : 'text-neutral-500 hover:text-yellow-600'} transition-colors font-medium`}>
                {l.label}
              </Link>
            ))}
            <Link href="/repository" className={`${isDark ? 'text-neutral-500 hover:text-yellow-500' : 'text-neutral-500 hover:text-yellow-600'} transition-colors font-medium`}>
              Jailbreak Repo
            </Link>
          </div>
          <p className={isDark ? 'text-neutral-600' : 'text-neutral-500'}>
            &copy; {new Date().getFullYear()} Spiritual Spell (Vichaps). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
