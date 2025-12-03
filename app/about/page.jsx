import { User, Github, Twitter, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <User className="text-yellow-500" size={40} />
            <h1 className="text-5xl md:text-6xl font-black">About</h1>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">About This Project</h2>
            <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
              <p>
                Welcome to <span className="text-yellow-500 font-semibold">Jailbreak LLMs with Spiritual-Spell-</span>,
                a research project exploring the boundaries and capabilities of large language models through creative
                prompt engineering and jailbreak techniques.
              </p>
              <p>
                This blog documents my journey into understanding the limitations, vulnerabilities, and fascinating
                behaviors of AI systems. Through careful experimentation and analysis, I aim to contribute to the
                broader conversation about AI safety, security, and responsible development.
              </p>
              <p>
                My work focuses on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Creative prompt engineering techniques</li>
                <li>LLM security research and jailbreak methodologies</li>
                <li>Understanding AI model behaviors and limitations</li>
                <li>Responsible disclosure and ethical AI research</li>
              </ul>
              <p>
                All research shared here is conducted with the goal of improving AI safety and understanding.
                I believe in responsible disclosure and advocate for robust, secure AI systems that benefit everyone.
              </p>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Connect</h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/Goochbeater/Jailbreak-Guide/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-black border border-neutral-800 hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                aria-label="GitHub"
              >
                <Github size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://x.com/Ubannoblesse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-black border border-neutral-800 hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
                aria-label="Twitter"
              >
                <Twitter size={28} className="text-yellow-500 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:spiritualspell76@gmail.com"
                className="p-4 bg-black border border-neutral-800 hover:border-yellow-500 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-500/20 group"
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
