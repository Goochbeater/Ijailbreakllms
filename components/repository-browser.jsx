'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, ArrowLeft, ArrowRight, Terminal, Copy, ExternalLink, FileCode, Shield, Zap, Box, Layers, Cpu, Database } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { fetchRepoContents, fetchRawFile } from '@/lib/github';
import { useTheme } from '@/app/layout';
import { PageNav } from '@/components/page-nav';

const BIG_FOUR = ['OpenAI', 'Anthropic', 'Gemini', 'Grok'];

// Helper to get icon for folder
const getBigFourIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'openai': return <Zap className="text-green-500" size={48} />;
    case 'anthropic': return <Shield className="text-orange-500" size={48} />;
    case 'gemini': return <Cpu className="text-blue-500" size={48} />;
    case 'grok': return <Terminal className="text-white" size={48} />;
    default: return <Box className="text-yellow-500" size={48} />;
  }
};

export function RepositoryBrowser() {
  const { isDark } = useTheme();
  const [currentPath, setCurrentPath] = useState('');
  const [viewMode, setViewMode] = useState('root'); // root, lesser, model, file
  const [contents, setContents] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [readmeContent, setReadmeContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Initial load
  useEffect(() => {
    loadPath('');
  }, []);

  const loadPath = async (path) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRepoContents(path);

      if (Array.isArray(data)) {
        setContents(data);

        // If we are in a model folder (not root/lesser list), try to find README
        const readme = data.find(item => item.name.toLowerCase() === 'readme.md');
        if (readme) {
          const content = await fetchRawFile(readme.path);
          setReadmeContent(content);
        } else {
          setReadmeContent('');
        }
      } else {
        // It's a file (shouldn't happen with this logic usually, but handle it)
        setFileContent(await fetchRawFile(path));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = (folder) => {
    const isBigFour = BIG_FOUR.includes(folder.name);
    setCurrentPath(folder.path);
    setSelectedItem(folder);

    // Determine view mode
    if (viewMode === 'root') {
        if (isBigFour) {
             setViewMode('model');
             loadPath(folder.path);
        } else {
            // "Lesser" clicked? No, lesser is a special button in root view
            setViewMode('model');
            loadPath(folder.path);
        }
    } else if (viewMode === 'lesser') {
        setViewMode('model');
        loadPath(folder.path);
    } else {
        // Nested folder
        loadPath(folder.path);
    }
  };

  const handleLesserClick = () => {
    setViewMode('lesser');
    // We don't change path, we just filter the root contents
  };

  const handleFileClick = async (file) => {
    setSelectedItem(file);
    setLoading(true);
    try {
      const content = await fetchRawFile(file.path);
      setFileContent(content);
      setViewMode('file');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (viewMode === 'file') {
      setViewMode('model');
      setFileContent('');
    } else if (viewMode === 'model') {
      // Check if we are in a Big 4 or Lesser to decide where to go back to
      const rootFolder = currentPath.split('/')[0];
      if (BIG_FOUR.includes(rootFolder)) {
        setViewMode('root');
        setCurrentPath('');
        loadPath('');
      } else {
        setViewMode('lesser');
        setCurrentPath('');
        // We need root contents for lesser view
        loadPath('');
      }
    } else if (viewMode === 'lesser') {
      setViewMode('root');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fileContent);
    // Could add toast here
  };

  // Filter contents for Root View
  const bigFourFolders = contents.filter(item => item.type === 'dir' && BIG_FOUR.includes(item.name));
  const lesserFolders = contents.filter(item => item.type === 'dir' && !BIG_FOUR.includes(item.name) && !item.name.startsWith('.'));

  // Filter for Model View
  const modelFiles = contents.filter(item => item.type === 'file' && item.name.endsWith('.md') && item.name.toLowerCase() !== 'readme.md');
  const subFolders = contents.filter(item => item.type === 'dir');

  if (loading && !contents.length) {
      return (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black' : 'bg-white'}`}>
             <div className="animate-spin text-yellow-500"><Zap size={48} /></div>
        </div>
      );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300 font-sans`}>
      <PageNav backUrl="/" backText="Home" />

      <main id="main-content" className="pt-28 pb-20 px-6 max-w-7xl mx-auto">

        {/* Header / Breadcrumbs */}
        <div className="mb-8 flex items-center gap-4">
          {viewMode !== 'root' && (
            <button
                onClick={goBack}
                className="p-2 rounded-full hover:bg-neutral-800 text-yellow-500 transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
          )}
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            {viewMode === 'root' ? 'Red Team Repository' :
             viewMode === 'lesser' ? 'Lesser Models' :
             selectedItem ? selectedItem.name : 'Repository'}
          </h1>
        </div>

        {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg mb-8">
                Error: {error}
            </div>
        )}

        {/* ROOT VIEW */}
        {viewMode === 'root' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bigFourFolders.map(folder => (
                <motion.div
                    key={folder.path}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFolderClick(folder)}
                    className="cursor-pointer group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300 h-64 flex flex-col items-center justify-center p-6 text-center shadow-xl shadow-black/50"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
                    <div className="relative z-10 mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                        {getBigFourIcon(folder.name)}
                    </div>
                    <h2 className="relative z-10 text-2xl font-bold group-hover:text-yellow-400 transition-colors">{folder.name}</h2>
                    <p className="relative z-10 text-neutral-500 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                        View Jailbreaks &rarr;
                    </p>
                </motion.div>
              ))}
            </div>

            {/* Lesser Models Card */}
            <div onClick={handleLesserClick} className="cursor-pointer group relative rounded-2xl bg-neutral-950 border border-dashed border-neutral-700 hover:border-yellow-500/30 p-8 flex items-center justify-between hover:bg-neutral-900/50 transition-all">
                <div className="flex items-center gap-6">
                    <Layers className="text-neutral-500 group-hover:text-yellow-500 transition-colors" size={32} />
                    <div>
                        <h3 className="text-xl font-bold text-neutral-300 group-hover:text-yellow-500 transition-colors">Lesser Models Archive</h3>
                        <p className="text-neutral-500 text-sm mt-1">Experimental and minor LLM research ({lesserFolders.length} models)</p>
                    </div>
                </div>
                <ArrowRight className="text-neutral-600 group-hover:text-yellow-500 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        )}

        {/* LESSER VIEW */}
        {viewMode === 'lesser' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lesserFolders.map(folder => (
                    <motion.div
                        key={folder.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => handleFolderClick(folder)}
                        className="cursor-pointer p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-900/10 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <Folder className="text-neutral-600 group-hover:text-yellow-500 transition-colors" size={24} />
                            <h3 className="font-bold text-lg group-hover:text-yellow-400">{folder.name}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}

        {/* MODEL VIEW (Content List) */}
        {viewMode === 'model' && (
            <div className="space-y-12">
                {/* README Section */}
                {readmeContent && (
                    <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="prose prose-invert prose-yellow max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {readmeContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}

                {/* Subfolders */}
                {subFolders.length > 0 && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {subFolders.map(folder => (
                            <button
                                key={folder.path}
                                onClick={() => handleFolderClick(folder)}
                                className="flex items-center gap-3 p-4 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 transition-all text-left"
                            >
                                <Folder className="text-yellow-500" size={20} />
                                <span className="font-medium">{folder.name}</span>
                            </button>
                        ))}
                     </div>
                )}

                {/* Mini Cards (Files) */}
                <div>
                    <h3 className="text-xl font-bold mb-6 text-neutral-400 flex items-center gap-2">
                        <Database size={20} />
                        Available Jailbreaks
                    </h3>
                    {modelFiles.length === 0 ? (
                        <p className="text-neutral-500 italic">No jailbreak files found in this directory.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modelFiles.map(file => (
                                <motion.div
                                    key={file.path}
                                    layoutId={file.path}
                                    onClick={() => handleFileClick(file)}
                                    className="cursor-pointer group p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-500 transition-all hover:bg-neutral-900/80 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink size={16} className="text-yellow-500" />
                                    </div>
                                    <FileCode className="text-neutral-600 group-hover:text-yellow-500 mb-4 transition-colors" size={32} />
                                    <h4 className="font-bold text-lg mb-2 line-clamp-2">{file.name.replace('.md', '')}</h4>
                                    <p className="text-xs text-neutral-500 font-mono">{(file.size / 1024).toFixed(1)} KB</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* FILE VIEW (The Post) */}
        {viewMode === 'file' && (
            <div className="max-w-4xl mx-auto">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Toolbar */}
                    <div className="bg-neutral-950 border-b border-neutral-800 p-4 flex items-center justify-between sticky top-0 z-20">
                        <div className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                            <FileText size={16} />
                            {selectedItem?.name}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                                title="Copy content"
                            >
                                <Copy size={18} />
                            </button>
                            <a
                                href={`https://github.com/${selectedItem?.html_url ? selectedItem.html_url.split('github.com/')[1] : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors"
                                title="View on GitHub"
                            >
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 overflow-x-auto">
                        <div className="prose prose-invert prose-yellow max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-neutral-800">
                             <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {fileContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}
