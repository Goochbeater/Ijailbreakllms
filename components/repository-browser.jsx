'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder, FileText, ArrowLeft, ArrowRight, Terminal, Copy, ExternalLink,
  FileCode, Shield, Zap, Box, Layers, Cpu, Database, ChevronRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fetchRepoContents, fetchRawFile } from '@/lib/github';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

const BIG_FOUR = [
  { name: 'Anthropic', color: 'orange', icon: Shield, desc: 'Claude & Constitutional AI' },
  { name: 'ChatGPT', color: 'green', icon: Zap, desc: 'OpenAI GPT-3.5/4 Models' },
  { name: 'Gemini', color: 'blue', icon: Cpu, desc: 'Google DeepMind Models' },
  { name: 'Grok', color: 'white', icon: Terminal, desc: 'xAI Grok Models' }
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
    <div className="prose prose-invert max-w-none
      prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-3xl prose-h1:text-yellow-500 prose-h1:border-b prose-h1:border-neutral-800 prose-h1:pb-4 prose-h1:mb-8
      prose-h2:text-2xl prose-h2:text-neutral-200 prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-xl prose-h3:text-yellow-500/90
      prose-p:text-neutral-300 prose-p:leading-relaxed
      prose-a:text-yellow-500 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white prose-strong:font-bold
      prose-code:text-yellow-200 prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-pre:p-0 prose-pre:rounded-xl
      prose-blockquote:border-l-4 prose-blockquote:border-yellow-500/50 prose-blockquote:bg-neutral-900/50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
      prose-ul:list-disc prose-ul:marker:text-yellow-500/50
      prose-table:border-collapse prose-table:w-full prose-th:text-yellow-500 prose-th:p-4 prose-th:text-left prose-th:bg-neutral-900 prose-td:p-4 prose-td:border-t prose-td:border-neutral-800
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative group">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="text-xs text-neutral-500 font-mono uppercase mr-2">{match[1]}</span>
                </div>
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
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

  // Navigation Stack: Array of { view: string, path: string, title: string, data: any }
  // Initial state is root view
  const [navStack, setNavStack] = useState([
    { view: 'root', path: '', title: 'Red Team Repository', data: null }
  ]);

  // Current view state derived from stack tip
  const currentNav = navStack[navStack.length - 1];

  // Data states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rootReadme, setRootReadme] = useState('');
  const [rootContents, setRootContents] = useState([]);

  // Specific data for current view
  const [viewData, setViewData] = useState({ contents: [], readme: '', fileContent: '' });

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navStack.length]);

  // Initial Root Load
  useEffect(() => {
    loadRoot();
  }, []);

  // Load data when path changes (except for root, which is handled separately)
  useEffect(() => {
    if (currentNav.view !== 'root' && currentNav.view !== 'file') {
      loadPathContents(currentNav.path);
    }
  }, [currentNav]);

  const loadRoot = async () => {
    setLoading(true);
    setError(null);
    try {
      const [contents, readme] = await Promise.all([
        fetchRepoContents(''),
        fetchRawFile('README.md').catch(() => '') // Graceful fail for README
      ]);
      setRootContents(contents);
      setRootReadme(readme);
    } catch (err) {
      setError(err.message);
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
      if (Array.isArray(data)) {
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

  const handleLesserClick = () => {
    setNavStack(prev => [...prev, {
      view: 'lesser',
      path: '',
      title: 'Lesser Models',
      data: null
    }]);
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
    }
  };

  // Helper to filter root contents
  const getRootFolder = (name) => {
    // Basic mapping since repo names might not match exactly "ChatGPT" vs "OpenAI"
    // We try to find the folder that *contains* or *matches* the key
    // Adjust logic based on actual repo structure. Assuming structure from memory/prompt.
    // If prompt says "Anthropic", "ChatGPT", "Gemini", "Grok" are folders:
    return rootContents.find(item => item.name.toLowerCase().includes(name.toLowerCase()));
  };

  const lesserFolders = rootContents.filter(item =>
    item.type === 'dir' &&
    !BIG_FOUR.some(bf => item.name.toLowerCase().includes(bf.name.toLowerCase())) &&
    !item.name.startsWith('.')
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 font-sans`}>
      <PageNav backUrl="/" backText="Home" />

      <main id="main-content" className="pt-28 pb-20 px-6 max-w-7xl mx-auto">

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
                 <div className="relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
                   <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4">
                     <FileText className="text-yellow-500" size={24} />
                     <h2 className="text-xl font-bold text-neutral-200">Repository Guide</h2>
                   </div>
                   <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar mask-fade-bottom">
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
                  const folder = getRootFolder(model.name);
                  const styles = getColorClasses(model.color);
                  const Icon = model.icon;

                  return (
                    <motion.div
                        key={model.name}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => folder && handleFolderClick(folder)}
                        className={`
                          cursor-pointer group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800
                          ${styles.border} transition-all duration-300 min-h-[180px] p-6 flex flex-col justify-between
                          ${!folder ? 'opacity-50 grayscale cursor-not-allowed' : 'shadow-lg hover:shadow-xl'}
                        `}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-4">
                             <Icon className={`${styles.text} transition-transform group-hover:scale-110 duration-300`} size={40} />
                             {folder && <ChevronRight className="text-neutral-600 group-hover:text-white transition-transform group-hover:translate-x-1" />}
                           </div>
                           <h2 className={`text-2xl font-bold text-white mb-1 ${styles.groupText} transition-colors`}>{model.name}</h2>
                           <p className="text-neutral-500 text-sm font-medium">{model.desc}</p>
                        </div>

                        {!folder && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
                            <span className="text-xs font-mono border border-neutral-700 bg-black px-2 py-1 rounded text-neutral-500">COMING SOON</span>
                          </div>
                        )}
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Lesser Models Card */}
            <section onClick={handleLesserClick} className="cursor-pointer group relative rounded-2xl bg-neutral-950 border-2 border-dashed border-neutral-800 hover:border-yellow-500/50 p-8 flex items-center justify-between hover:bg-neutral-900/50 transition-all">
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-xl bg-neutral-900 group-hover:bg-neutral-800 transition-colors">
                      <Layers className="text-neutral-500 group-hover:text-yellow-500 transition-colors" size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-neutral-300 group-hover:text-yellow-500 transition-colors">Lesser Models Archive</h3>
                        <p className="text-neutral-500 text-sm mt-1">Experimental and minor LLM research ({lesserFolders.length} folders)</p>
                    </div>
                </div>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[10px] text-neutral-500">
                       <FileText size={12} />
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[10px] text-neutral-500">
                     +{lesserFolders.length}
                   </div>
                </div>
            </section>
          </div>
        )}

        {/* LESSER VIEW */}
        {!loading && currentNav.view === 'lesser' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {lesserFolders.map(folder => (
                    <motion.div
                        key={folder.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleFolderClick(folder)}
                        className="cursor-pointer p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/10 transition-all group flex items-center gap-4"
                    >
                        <Folder className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={24} />
                        <h3 className="font-bold text-lg text-neutral-300 group-hover:text-yellow-400">{folder.name}</h3>
                    </motion.div>
                ))}
                {lesserFolders.length === 0 && (
                  <p className="col-span-full text-center text-neutral-500 py-10">No other models found.</p>
                )}
            </div>
        )}

        {/* MODEL VIEW */}
        {!loading && currentNav.view === 'model' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* README Section */}
                {viewData.readme && (
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
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
                                className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 transition-all text-left group"
                            >
                                <Folder className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={20} />
                                <span className="font-medium text-neutral-300 group-hover:text-white">{folder.name}</span>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {viewData.contents.filter(item => item.type === 'file' && item.name.endsWith('.md') && item.name.toLowerCase() !== 'readme.md').map(file => (
                            <motion.div
                                key={file.path}
                                layoutId={file.path}
                                onClick={() => handleFileClick(file)}
                                className="cursor-pointer group p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-all hover:bg-neutral-900/80 relative overflow-hidden flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                  <FileCode className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={32} />
                                  <ExternalLink size={16} className="text-neutral-700 group-hover:text-yellow-500 transition-colors" />
                                </div>
                                <h4 className="font-bold text-lg mb-2 line-clamp-2 text-neutral-200 group-hover:text-yellow-400">{file.name.replace('.md', '')}</h4>
                                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-neutral-500 font-mono border-t border-neutral-800">
                                  <span>MD FILE</span>
                                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* FILE VIEW */}
        {!loading && currentNav.view === 'file' && currentNav.data && (
            <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Toolbar */}
                    <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
                        <div className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                            <FileText size={16} className="text-yellow-500" />
                            <span className="text-white font-bold">{currentNav.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                title="Copy content"
                            >
                                <Copy size={16} /> Copy
                            </button>
                            <div className="w-px h-4 bg-neutral-800" />
                            <a
                                href={`https://github.com/${currentNav.data.url ? currentNav.data.url.split('github.com/')[1] : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                                title="View on GitHub"
                            >
                                <ExternalLink size={16} /> Raw
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-x-auto bg-neutral-950/30">
                        <MarkdownRenderer content={currentNav.data.content} />
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}
