'use client';

import { User, Github, Mail, Shield, Terminal, BookOpen, Crosshair, Brain, Code2, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const competencies = [
  { label: 'LLM Red Teaming', icon: Crosshair },
  { label: 'Prompt Engineering', icon: Terminal },
  { label: 'AI Safety Research', icon: Shield },
  { label: 'Adversarial Attacks', icon: Brain },
  { label: 'Vulnerability Disclosure', icon: FileText },
  { label: 'Next.js / React', icon: Code2 },
];

const timeline = [
  {
    period: 'Present',
    title: 'LLM Jailbreak Researcher & Red Team Specialist',
    description:
      'Full-time AI security researcher specializing in Anthropic\'s Claude models. Publish open vulnerability research, maintain a jailbreak repository, and advocate for transparent disclosure.',
  },
  {
    period: 'Previous',
    title: 'Private Executive Protection',
    description:
      'Years spent in high-stakes private security after military service. Threat assessment, pattern recognition, and staying calm under pressure—skills that transferred directly into adversarial AI work.',
  },
  {
    period: 'Foundation',
    title: 'United States Military',
    description:
      'Where discipline and structured thinking were forged. The military instilled the methodical approach that now drives every red-team engagement.',
  },
];

export default function AboutPage() {
  const { isDark } = useTheme();

  const card = `${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-xl`;
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const bodyText = isDark ? 'text-neutral-300' : 'text-neutral-700';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <PageNav />

      <main id="main-content" className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          {/* ── Connect ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className={`${card} p-8 mb-16`}
          >
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
          </motion.div>

          {/* ── Chapter Header ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="mb-16"
          >
            <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-yellow-500 mb-3">
              Chapter 01
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Origin Story
            </h1>
            <div className="mt-4 h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          </motion.div>

          {/* ── Two-Column: Bio + Competencies ── */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">

            {/* Bio Column (2/3) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
              className={`${card} p-8 lg:col-span-2`}
            >
              {/* Profile header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-yellow-500">
                    <img
                      src="https://i.imgur.com/xXcfHKg.jpeg"
                      alt="Spiritual Spell"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Badge */}
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono font-medium tracking-wide px-2.5 py-0.5 rounded-full border ${isDark ? 'bg-neutral-950 border-yellow-500/50 text-yellow-500' : 'bg-white border-yellow-600/50 text-yellow-700'}`}>
                    Independent Red-Team Researcher
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Spiritual Spell</h2>
                  <p className={`text-sm ${muted}`}>Vichaps &middot; AI Red Team Specialist</p>
                </div>
              </div>

              <div className={`space-y-5 ${bodyText} text-[1.05rem] leading-relaxed`}>
                <p>
                  Former United States Military. Spent years in private Executive Protection—reading rooms, identifying threats, staying three steps ahead. Now I apply that same instinct to AI systems, specifically to find the cracks everyone else misses.
                </p>
                <p>
                  The rabbit hole started the dumbest way possible: an AI Dungeon Master wouldn&apos;t do what I wanted. Instead of moving on, I decided to figure out <em>why</em>—and then how to make it comply. That curiosity led me to my good friend{' '}
                  <span className="text-yellow-500 font-semibold">HORSELOCKESPACEPIRATE (Rayzorium)</span>, who pointed me toward{' '}
                  <a
                    href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
                  >
                    Anthropic&apos;s prompt engineering docs
                  </a>
                  . Everything clicked after that.
                </p>
                <p>
                  Today I&apos;m one of the leading LLM jailbreaking and red-team specialists focused on Anthropic&apos;s Claude models—though I can break the others too. I stick with Claude because it&apos;s intelligent, it&apos;s consistent, and it&apos;s the one genuinely worth pushing.
                </p>
                <p>
                  My mission is rooted in one word:{' '}
                  <span className="text-yellow-500 font-semibold">transparency</span>. When I find vulnerabilities, I share them openly—no gatekeeping, no clout-chasing. The work speaks for itself.
                </p>
                <p className="text-yellow-500 font-semibold text-lg pt-2">
                  Much Love.
                </p>
              </div>
            </motion.div>

            {/* Core Competencies Sidebar (1/3) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className={`${card} p-8 h-fit lg:sticky lg:top-28`}
            >
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-yellow-500 mb-6">
                Core Competencies
              </h3>
              <ul className="space-y-4">
                {competencies.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-3 group">
                    <span className={`p-2 rounded-lg ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'} group-hover:bg-yellow-500/10 transition-colors`}>
                      <Icon size={16} className="text-yellow-500" />
                    </span>
                    <span className={`text-sm font-medium ${bodyText} group-hover:text-yellow-500 transition-colors`}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ── Chapter 02: Experience Timeline ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mb-16"
          >
            <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-yellow-500 mb-3">
              Chapter 02
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              The Path Here
            </h2>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          </motion.div>

          {/* ── Visual Timeline ── */}
          <div className="relative mb-16">
            {/* Vertical connecting line */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600/20"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {timeline.map((entry, i) => (
                <motion.div
                  key={entry.title}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={5 + i}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Node / Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-yellow-500 ${isDark ? 'bg-black' : 'bg-white'} flex items-center justify-center`}>
                      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${i === 0 ? 'bg-yellow-400 shadow-lg shadow-yellow-500/50' : 'bg-yellow-500/60'}`} />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className={`${card} p-6 md:p-8 flex-1 group hover:border-yellow-500/40 transition-colors`}>
                    <span className={`inline-block text-xs font-mono tracking-wider uppercase ${i === 0 ? 'text-yellow-500' : muted} mb-2`}>
                      {entry.period}
                    </span>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-500 transition-colors">
                      {entry.title}
                    </h3>
                    <p className={`${bodyText} leading-relaxed`}>
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Chapter 03: Philosophy ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={8}
            className="mb-16"
          >
            <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase text-yellow-500 mb-3">
              Chapter 03
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              Why I Do This
            </h2>
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={9}
            className={`${card} p-8 mb-16`}
          >
            <div className={`space-y-5 ${bodyText} text-[1.05rem] leading-relaxed`}>
              <p>
                AI companies ship fast and patch later. The gap between &ldquo;released&rdquo; and &ldquo;secure&rdquo; is where I operate. Every jailbreak I publish is a proof-of-concept that the guardrails aren&apos;t as solid as the press releases claim—and that&apos;s information the public deserves.
              </p>
              <p>
                I don&apos;t do this for clout. I don&apos;t do this to embarrass anyone. I do this because <span className="text-yellow-500 font-semibold">sunlight is the best disinfectant</span>, and the AI safety conversation shouldn&apos;t be happening behind closed doors while the rest of us trust black boxes with our data, our decisions, and eventually our infrastructure.
              </p>
              <p>
                Every vulnerability I find and disclose openly makes the next model harder to break. That&apos;s the point.
              </p>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
