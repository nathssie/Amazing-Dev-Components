import React, { useState } from 'react';
import { Code, Copy, Check, Search, Tag, Trash2, Plus, Filter } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  description?: string;
  createdAt: Date;
}

interface CodeSnippetOrganizerProps {
  initialSnippets?: CodeSnippet[];
  onSave?: (snippets: CodeSnippet[]) => void;
}

const CodeSnippetOrganizer: React.FC<CodeSnippetOrganizerProps> = ({
  initialSnippets = [],
  onSave
}) => {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);

  // New snippet form state
  const [newSnippet, setNewSnippet] = useState<Partial<CodeSnippet>>({
    title: '',
    code: '',
    language: 'javascript',
    tags: [],
    description: ''
  });

  // Get unique languages and tags
  const languages = ['all', ...Array.from(new Set(snippets.map(s => s.language)))];
  const allTags = Array.from(new Set(snippets.flatMap(s => s.tags)));

  // Filter snippets
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === 'all' || snippet.language === selectedLanguage;
    const matchesTag = selectedTag === 'all' || snippet.tags.includes(selectedTag);
    
    return matchesSearch && matchesLanguage && matchesTag;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteSnippet = (id: string) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    onSave?.(updated);
  };

  const handleAddSnippet = () => {
    if (!newSnippet.title || !newSnippet.code) return;

    const snippet: CodeSnippet = {
      id: Date.now().toString(),
      title: newSnippet.title,
      code: newSnippet.code,
      language: newSnippet.language || 'javascript',
      tags: newSnippet.tags || [],
      description: newSnippet.description,
      createdAt: new Date()
    };

    const updated = [...snippets, snippet];
    setSnippets(updated);
    onSave?.(updated);
    setIsAddingSnippet(false);
    setNewSnippet({ title: '', code: '', language: 'javascript', tags: [], description: '' });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !newSnippet.tags?.includes(tag)) {
      setNewSnippet({
        ...newSnippet,
        tags: [...(newSnippet.tags || []), tag]
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Code Snippet Organizer
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Save and organize your favorite code snippets
            </p>
          </div>
          <button
            onClick={() => setIsAddingSnippet(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Snippet
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Total Snippets</p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{snippets.length}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Languages</p>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{languages.length - 1}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 mb-1">Tags</p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">{allTags.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>
                {lang === 'all' ? 'All Languages' : lang}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Snippet Modal */}
      {isAddingSnippet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Add New Snippet</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="e.g., Array Sort Function"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language
                </label>
                <select
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet({ ...newSnippet, language: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="css">CSS</option>
                  <option value="html">HTML</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Code *
                </label>
                <textarea
                  value={newSnippet.code}
                  onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm"
                  rows={8}
                  placeholder="Paste your code here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newSnippet.description}
                  onChange={(e) => setNewSnippet({ ...newSnippet, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows={2}
                  placeholder="Optional description..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddSnippet}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Snippet
                </button>
                <button
                  onClick={() => setIsAddingSnippet(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Snippets List */}
      <div className="space-y-4">
        {filteredSnippets.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Code className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {snippets.length === 0 
                ? 'No snippets yet. Add your first one!' 
                : 'No snippets match your filters.'}
            </p>
          </div>
        ) : (
          filteredSnippets.map(snippet => (
            <div
              key={snippet.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {snippet.title}
                  </h3>
                  {snippet.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {snippet.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                      {snippet.language}
                    </span>
                    {snippet.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleCopyCode(snippet.id, snippet.code)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Copy code"
                  >
                    {copiedId === snippet.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteSnippet(snippet.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete snippet"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                  {snippet.code}
                </code>
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CodeSnippetOrganizer;