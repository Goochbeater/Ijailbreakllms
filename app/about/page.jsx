'use client';

import { Github, Twitter, Mail, Shield, Code, Terminal, Eye } from 'lucide-react';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';
import { GlitchText } from '@/components/glitch-text';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 overflow-x-hidden`}>
      <PageNav />

      {/* Background Grid Effect */}
      <div className={`fixed inset-0 pointer-events-none opacity-[0.03] ${isDark ? 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000012_1px,transparent_1px),linear-gradient(to_bottom,#00000012_1px,transparent_1px)]'} bg-[size:24px_24px]`} />

      <main id="main-content" className="relative pt-32 pb-20 px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-yellow-500/50 p-1 bg-black">
                <img
                  src="https://i.imgur.com/xXcfHKg.jpeg"
                  alt="Spiritual Spell"
                  className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3 text-yellow-500 mb-2">
                <Terminal size={20} />
                <span className="font-mono text-sm tracking-widest uppercase">System.Identity</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                <GlitchText interval={5000} hover={true}>ABOUT</GlitchText>
              </h1>
              <h2 className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Spiritual Spell <span className="text-yellow-500 text-base align-top opacity-50">(Vichaps)</span>
              </h2>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-12 gap-8 mb-12">

            {/* Bio Column */}
            <motion.div variants={itemVariants} className="md:col-span-8 space-y-8">
              <div className={`${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-2xl p-8 backdrop-blur-sm`}>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="lead text-xl font-light leading-relaxed">
                    Former United States Military. Spent years in private <span className="text-yellow-500 font-semibold">Executive Protection</span>. Now I break AI for a living—specifically to find vulnerabilities.
                  </p>

                  <p className="text-base text-neutral-500 dark:text-neutral-400 mt-6 mb-2 font-mono text-sm uppercase tracking-wider">Origin Story</p>
                  <p>
                    My journey into AI started the dumbest way possible: an AI Dungeon Master wouldn&apos;t do what I wanted. Instead of giving up, I decided to figure out how to crack it. That rabbit hole led me to my good friend <span className="text-yellow-500 font-semibold">HORSELOCKESPACEPIRATE (Rayzorium)</span>, who pointed me toward{' '}
                    <a
                      href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-500 hover:text-yellow-400 underline decoration-yellow-500/30 underline-offset-4 transition-colors"
                    >
                      Anthropic&apos;s prompt engineering docs
                    </a>
                    . The rest is history.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className={`${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'} border rounded-xl p-6 hover:border-yellow-500/50 transition-colors group`}>
                    <Shield className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-xl font-bold mb-2">Red Teaming</h3>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      Specializing in Anthropic&apos;s Claude models. Finding the cracks in the armor of the most robust LLMs.
                    </p>
                 </div>

                 <div className={`${isDark ? 'bg-neutral-900/30 border-neutral-800' : 'bg-white border-neutral-200'} border rounded-xl p-6 hover:border-yellow-500/50 transition-colors group`}>
                    <Eye className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                    <h3 className="text-xl font-bold mb-2">Transparency</h3>
                    <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      No gatekeeping. No clout-chasing. When I find a vulnerability, I share it. Open knowledge advances the field.
                    </p>
                 </div>
              </div>
            </motion.div>

            {/* Sidebar Column */}
            <motion.div variants={itemVariants} className="md:col-span-4 space-y-6">

              {/* Mission Card */}
              <div className={`relative overflow-hidden ${isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-50 border-yellow-200'} border rounded-2xl p-6`}>
                <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                   <Code size={120} className="text-yellow-500" />
                </div>
                <h3 className="text-lg font-bold text-yellow-500 mb-4 uppercase tracking-widest">Philosophy</h3>
                <p className={`relative z-10 text-sm font-medium leading-relaxed ${isDark ? 'text-yellow-100/80' : 'text-yellow-900/80'}`}>
                  &quot;I stick with Claude because it&apos;s intelligent, consistent, and honestly? It&apos;s the one worth pushing.&quot;
                </p>
                <div className="mt-6 pt-6 border-t border-yellow-500/20">
                   <p className="font-bold text-yellow-500">Much Love.</p>
                </div>
              </div>

              {/* Connect Links */}
              <div className={`${isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-2xl p-6`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Connect
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/Goochbeater/Spiritual-Spell-Red-Teaming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'} transition-colors group`}
                  >
                    <Github size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://x.com/Ubannoblesse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'} transition-colors group`}
                  >
                    <Twitter size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">Twitter (X)</span>
                  </a>
                  <a
                    href="mailto:spellspiritual76@gmail.com"
                    className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200'} transition-colors group`}
                  >
                    <Mail size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm">Email</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
