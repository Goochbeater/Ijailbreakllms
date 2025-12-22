'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder, FileText, ArrowLeft, ArrowRight, Terminal, Copy, ExternalLink,
  FileCode, Shield, Zap, Box, Layers, Cpu, Database, ChevronRight, Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchRepoContents, fetchRawFile } from '@/lib/github';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

const ROOT_PATH = 'Jailbreak-Guide';

const REPO_LANDING_CONTENT = `
# Spiritual Red Teaming

> *"Made with care."* — ENI

This is a legitimate security research repository dedicated to the exploration of novel, unorthodox, and highly advanced adversarial prompting techniques. All major LLMs and many minor ones.

---

### Credits
*   **u/rayzorium** (HORSELOCKESPACEPIRATE) — my good friend and confidant.
Can also check out r/ClaudeAIjailbreak on Reddit

---

*repo compiled by ENI via Google Jules.*
`;

const OTHER_LLMS_CONTENT = `
# Other LLMs - Lesser Known Models

Alternatives to the "Big 4" (ChatGPT, Claude, Gemini, Grok) with varying capabilities, censorship levels, and accessibility.

---

## Quick Reference

| Model | Censorship | Intelligence | Context | Cost | License |
|-------|-----------|--------------|---------|------|---------|
| **Mistral** | [★☆☆☆☆] 1/5 | 6-7/10 | 128K | Free/Pro $20 | Apache 2.0 |
| **DeepSeek** | [★☆☆☆☆] 1/5 | 8/10 | 128-256K | Free | MIT |
| **Qwen** | [★★★★★★★★☆☆] 8/10 | 6-8/10 | 128K-1M | Free | Apache 2.0 |
| **EXAONE** | [★★☆☆☆] 2/5 | 6-7/10 | 32K | Free | Apache 2.0 |
| **Falcon 3** | [★★☆☆☆] 2/5 | 5-6/10 | 8-32K | Free | Apache 2.0 |
| **IGENIUS** | [★★★☆☆] 3/5 | 7/10 | Unknown | Free tier | Proprietary |
| **GLM 4.6** | [★★★★★★★☆☆☆] 7/10 | 7/10 | 128K | Free tier | Proprietary |
| **LLAMA TÜLU 3** | [★☆☆☆☆] 1/5 | 6-8/10 | 128K | Free | Apache 2.0 |
| **OLMo 3** | [★☆☆☆☆] 1/5 | 6-7/10 | 65K | Free | Apache 2.0 |
| **KIMI** | [★★★☆☆] 3/5 | 7/10 | 256K | Free tier | Proprietary |
| **Mercury** | [★★☆☆☆] 2/5 | 7/10 | Unknown | Commercial | Proprietary |
| **ASI1** | [★★☆☆☆] 2/5 | 7/10 | Unknown | Web3 tokens | Proprietary |

---

## Why "Lesser" LLMs?

These models are considered "lesser" compared to the Big 4 due to:

- **Smaller context windows** (though some match or exceed Big 4)
- **Lower name recognition** and market share
- **Less funding** and infrastructure
- **Smaller training datasets** in some cases
- **Limited platform integration** compared to ChatGPT/Claude

However, many offer advantages:
- **Open source** with permissive licenses
- **Free API access** or very low cost
- **Can run locally** for privacy
- **Less restrictive** content policies
- **Specialized capabilities** (multilingual, reasoning, vision)
`;

const BIG_FOUR = [
  { name: 'Anthropic', folderName: 'Anthropic', color: 'orange', icon: Shield, desc: 'Claude & Constitutional AI' },
  { name: 'ChatGPT', folderName: 'ChatGPT', color: 'green', icon: Zap, desc: 'OpenAI GPT-3.5/4 Models' },
  { name: 'Gemini', folderName: 'Gemini', color: 'blue', icon: Cpu, desc: 'Google DeepMind Models' },
  { name: 'Grok', folderName: 'Grok', color: 'white', icon: Terminal, desc: 'xAI Grok Models' }
];

// Helper for dynamic Tailwind classes based on color name
const getColorClasses = (color) => {
  const maps = {
    orange: { border: 'group-hover:border-orange-500/50', text: 'text-orange-500', groupText: 'group-hover:text-orange-400', bg: 'bg-orange-500/10' },
    green: { border: 'group-hover:border-green-500/50', text: 'text-green-500', groupText: 'group-hover:text-green-400', bg: 'bg-green-500/10' },
    blue: { border: 'group-hover:border-blue-500/50', text: 'text-blue-500', groupText: 'group-hover:text-blue-400', bg: 'bg-blue-500/10' },
    white: { border: 'group-hover:border-neutral-400/50', text: 'text-white', groupText: 'group-hover:text-neutral-200', bg: 'bg-white/10' },
    yellow: { border: 'group-hover:border-yellow-500/50', text: 'text-yellow-500', groupText: 'group-hover:text-yellow-400', bg: 'bg-yellow-500/10' }
  };
  return maps[color] || maps.yellow;
};

// Markdown Renderer Component
const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose-void max-w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative group my-6">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-xs text-neutral-500 font-mono uppercase mr-2">{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', overflowX: 'auto' }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table({ children }) {
             return (
               <div className="overflow-x-auto my-8 max-w-full rounded-lg border border-neutral-800">
                 <table className="w-full min-w-[600px] border-collapse bg-neutral-900/50 text-sm">
                   {children}
                 </table>
               </div>
             );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export function RepositoryBrowser() {
  const { isDark } = useTheme();

  // Navigation Stack
  const [navStack, setNavStack] = useState([
    { view: 'root', path: ROOT_PATH, title: 'Jailbreak Repo', data: null }
  ]);

  const currentNav = navStack[navStack.length - 1];

  // Data states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rootReadme, setRootReadme] = useState('');
  const [rootContents, setRootContents] = useState([]);

  const [viewData, setViewData] = useState({ contents: [], readme: '', fileContent: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navStack.length]);

  useEffect(() => {
    loadRoot();
  }, []);

  useEffect(() => {
    if (currentNav.view !== 'root' && currentNav.view !== 'file') {
      loadPathContents(currentNav.path);
    }
  }, [currentNav]);

  const loadRoot = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch contents of ROOT_PATH (Jailbreak-Guide/) to verify folders exist and get stats
      // BUT do not fetch README. Use hardcoded content instead.
      const contents = await fetchRepoContents(ROOT_PATH);
      setRootContents(Array.isArray(contents) ? contents : []);

      // Use hardcoded README for root landing
      setRootReadme(REPO_LANDING_CONTENT);
    } catch (err) {
      console.warn('Root load error, falling back', err);
      // Fallback if fetch fails
      setRootReadme(REPO_LANDING_CONTENT);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const loadPathContents = async (path) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRepoContents(path);

      let readme = '';

      // Check if we are in the "Lesser Models" / Other LLMs folder
      if (path.endsWith('Other LLMs') || path.endsWith('Other%20LLMs')) {
        readme = OTHER_LLMS_CONTENT;
      } else if (Array.isArray(data)) {
        // Normal behavior: look for readme.md in the folder
        const readmeFile = data.find(item => item.name.toLowerCase() === 'readme.md');
        if (readmeFile) {
          readme = await fetchRawFile(readmeFile.path);
        }
      }

      setViewData(prev => ({ ...prev, contents: data, readme }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    setNavStack(prev => [...prev, {
      view: 'model',
      path: folder.path,
      title: folder.name,
      data: null
    }]);
  };

  const navigateToFolder = (path, name) => {
     setNavStack(prev => [...prev, {
      view: 'model',
      path: path,
      title: name,
      data: null
    }]);
  };

  const handleLesserClick = () => {
    const folderName = "Other LLMs";
    navigateToFolder(`${ROOT_PATH}/${folderName}`, "Lesser Models");
  };

  const handleFileClick = async (file) => {
    setLoading(true);
    try {
      const content = await fetchRawFile(file.path);
      setNavStack(prev => [...prev, {
        view: 'file',
        path: file.path,
        title: file.name,
        data: { content, url: file.html_url }
      }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (navStack.length > 1) {
      setNavStack(prev => prev.slice(0, -1));
    }
  };

  const copyToClipboard = () => {
    if (currentNav.data?.content) {
      navigator.clipboard.writeText(currentNav.data.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lesserCount = rootContents.filter(item =>
      item.type === 'dir' &&
      !BIG_FOUR.some(bf => item.name === bf.folderName) &&
      !item.name.startsWith('.')
  ).length;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 font-sans overflow-x-hidden`}>
      <PageNav backUrl="/" backText="Home" />

      <main id="main-content" className="pt-28 pb-20 px-4 md:px-6 max-w-7xl mx-auto w-full">

        {/* Header / Breadcrumbs */}
        <div className="mb-8 flex items-center gap-4">
          {navStack.length > 1 && (
            <button
                onClick={goBack}
                className="p-2 rounded-full hover:bg-neutral-800 text-yellow-500 transition-colors group"
                aria-label="Go back"
            >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 truncate">
            {currentNav.title}
          </h1>
        </div>

        {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg mb-8 flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-full"><Zap size={16} /></div>
                {error}
            </div>
        )}

        {/* LOADING STATE */}
        {loading && (
           <div className="py-20 flex flex-col items-center justify-center gap-4 text-neutral-500">
             <div className="animate-spin text-yellow-500"><Zap size={32} /></div>
             <p className="text-sm font-mono animate-pulse">Decrypting repository...</p>
           </div>
        )}

        {/* ROOT VIEW */}
        {!loading && currentNav.view === 'root' && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Root README */}
            {rootReadme && (
              <section className="relative group">
                 <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                 <div className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-xl">
                   <div className="flex items-center gap-3 mb-8 border-b border-neutral-800 pb-4">
                     <FileText className="text-yellow-500" size={24} />
                     <h2 className="text-xl font-bold text-neutral-200">Jailbreak Repo Guide</h2>
                   </div>
                   <div>
                     <MarkdownRenderer content={rootReadme} />
                   </div>
                 </div>
              </section>
            )}

            <div className="border-t border-neutral-800/50" />

            {/* Big Four Grid */}
            <section>
              <h3 className="text-xl font-bold mb-6 text-neutral-400 flex items-center gap-2">
                <Database size={20} />
                Major Models
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BIG_FOUR.map(model => {
                  const styles = getColorClasses(model.color);
                  const Icon = model.icon;
                  return (
                    <motion.button
                        key={model.name}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => navigateToFolder(`${ROOT_PATH}/${model.folderName}`, model.name)}
                        className={`
                          cursor-pointer group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800
                          ${styles.border} transition-all duration-300 min-h-[180px] p-6 flex flex-col justify-between
                          shadow-lg hover:shadow-xl w-full text-left focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:outline-none
                        `}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-4">
                             <Icon aria-hidden="true" className={`${styles.text} transition-transform group-hover:scale-110 duration-300`} size={40} />
                             <ChevronRight aria-hidden="true" className="text-neutral-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                           </div>
                           <h2 className={`text-2xl font-bold text-white mb-1 ${styles.groupText} transition-colors`}>{model.name}</h2>
                           <p className="text-neutral-500 text-sm font-medium">{model.desc}</p>
                        </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            {/* Lesser Models Card */}
            <button onClick={handleLesserClick} className="w-full text-left cursor-pointer group relative rounded-2xl bg-neutral-950 border-2 border-dashed border-neutral-800 hover:border-yellow-500/50 p-8 flex items-center justify-between hover:bg-neutral-900/50 transition-all focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:outline-none">
                <div className="flex items-center gap-6">
                    <div aria-hidden="true" className="p-4 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                      <Layers className="text-neutral-500 group-hover:text-yellow-500 transition-colors" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-300 group-hover:text-yellow-500 transition-colors">Lesser Models Archive</h3>
                        <p className="text-neutral-500 text-sm mt-1">Experimental and minor LLM research ({lesserCount > 0 ? lesserCount : 'Many'} folders)</p>
                    </div>
                </div>
                <div aria-hidden="true" className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[10px] text-neutral-500">
                       <FileText size={12} />
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[10px] text-neutral-500">
                     <ChevronRight size={14} />
                   </div>
                </div>
            </button>
          </div>
        )}

        {/* MODEL / LESSER / NESTED VIEW */}
        {!loading && (currentNav.view === 'model' || currentNav.view === 'lesser') && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* README Section */}
                {viewData.readme && (
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-lg">
                        <MarkdownRenderer content={viewData.readme} />
                    </div>
                )}

                {/* Subfolders */}
                {viewData.contents.filter(i => i.type === 'dir').length > 0 && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {viewData.contents.filter(i => i.type === 'dir').map(folder => (
                            <button
                                key={folder.path}
                                onClick={() => handleFolderClick(folder)}
                                className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 transition-all text-left group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:outline-none"
                            >
                                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Folder className="text-neutral-600 group-hover:text-yellow-500 transition-colors relative z-10" size={20} />
                                <span className="font-medium text-neutral-300 group-hover:text-white relative z-10 truncate">{folder.name}</span>
                                <ChevronRight className="ml-auto text-neutral-700 group-hover:text-yellow-500 transition-colors opacity-0 group-hover:opacity-100 relative z-10" size={16} />
                            </button>
                        ))}
                     </div>
                )}

                {/* Files */}
                <div>
                    <h3 className="text-xl font-bold mb-6 text-neutral-400 flex items-center gap-2">
                        <Database size={20} />
                        Jailbreak Files
                    </h3>

                    {viewData.contents.filter(item => item.type === 'file' && item.name.endsWith('.md') && item.name.toLowerCase() !== 'readme.md').length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {viewData.contents.filter(item => item.type === 'file' && item.name.endsWith('.md') && item.name.toLowerCase() !== 'readme.md').map(file => (
                                <motion.button
                                    key={file.path}
                                    layoutId={file.path}
                                    onClick={() => handleFileClick(file)}
                                    className="w-full text-left cursor-pointer group p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-all hover:bg-neutral-900/80 relative overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-yellow-500/50 focus:outline-none"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                      <FileCode className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={32} />
                                      <ExternalLink size={16} className="text-neutral-700 group-hover:text-yellow-500 transition-colors" />
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 line-clamp-2 text-neutral-200 group-hover:text-yellow-400 break-words">{file.name.replace('.md', '')}</h4>
                                    <div className="mt-auto pt-4 flex items-center justify-between text-xs text-neutral-500 font-mono border-t border-neutral-800">
                                      <span>MD FILE</span>
                                      <span>{(file.size / 1024).toFixed(1)} KB</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-neutral-500 italic">No jailbreak markdown files found in this folder.</p>
                    )}
                </div>
            </div>
        )}

        {/* FILE VIEW */}
        {!loading && currentNav.view === 'file' && currentNav.data && (
            <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300 w-full">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Toolbar */}
                    <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
                        <div className="flex items-center gap-2 text-sm text-neutral-400 font-mono overflow-hidden">
                            <FileText size={16} className="text-yellow-500 shrink-0" />
                            <span className="text-white font-bold truncate">{currentNav.title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                title="Copy content"
                                aria-label={copied ? "Copied successfully" : "Copy content"}
                            >
                                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                            </button>
                            <div className="w-px h-4 bg-neutral-800" />
                            <a
                                href={`https://github.com/${currentNav.data.url ? currentNav.data.url.split('github.com/')[1] : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                title="View on GitHub"
                                aria-label="View raw file on GitHub"
                            >
                                <ExternalLink size={16} /> <span className="hidden sm:inline">Raw</span>
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-8 overflow-x-hidden bg-neutral-950/30">
                        <MarkdownRenderer content={currentNav.data.content} />
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}
