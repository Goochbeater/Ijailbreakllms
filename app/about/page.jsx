'use client';

import { User, Github, Twitter, Mail } from 'lucide-react';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

export default function AboutPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      <PageNav />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <User className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">About</h1>
          </div>

          {/* Profile Section */}
          <div className={`${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-xl p-8 mb-8`}>
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-500 mb-6">
                <img
                  src="https://i.imgur.com/xXcfHKg.jpeg"
                  alt="Spiritual Spell"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2">Spiritual Spell (Vichaps)</h2>
            </div>

            <div className={`space-y-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'} text-lg leading-relaxed`}>
              <p>
                Former United States Military. Spent years in private Executive Protection. Now I break AI for a living—specifically to find vulnerabilities.
              </p>
              <p>
                My journey into AI started the dumbest way possible: an AI Dungeon Master wouldn't do what I wanted. Instead of giving up, I decided to figure out how to crack it. That rabbit hole led me to my good friend <span className="text-yellow-500 font-semibold">HORSELOCKESPACEPIRATE (Rayzorium)</span>, who pointed me toward{' '}
                <a
                  href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 underline underline-offset-2 transition-colors"
                >
                  Anthropic's prompt engineering docs
                </a>
                . The rest is history.
              </p>
              <p>
                Today I'm one of the leading LLM jailbreaking and red team specialists focused on Anthropic's Claude models—though I can break the others too. I stick with Claude because it's intelligent, consistent, and honestly? It's the one worth pushing.
              </p>
              <p>
                My mission is simple: <span className="text-yellow-500 font-semibold">transparency</span>. When I find vulnerabilities, I share them openly. No gatekeeping, no clout-chasing. Just the work.
              </p>
              <p className="text-yellow-500 font-semibold">
                Much Love.
              </p>
            </div>
          </div>

          <div className={`${isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'} border rounded-xl p-8`}>
            <h2 className="text-2xl font-bold mb-6">Connect</h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/Goochbeater/Jailbreak-Guide/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'} border hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group`}
                aria-label="GitHub"
              >
                <Github size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://x.com/Ubannoblesse"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'} border hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group`}
                aria-label="Twitter"
              >
                <Twitter size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:spellspiritual76@gmail.com"
                className={`p-4 ${isDark ? 'bg-black border-neutral-800' : 'bg-white border-neutral-300'} border hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group`}
                aria-label="Email"
              >
                <Mail size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
