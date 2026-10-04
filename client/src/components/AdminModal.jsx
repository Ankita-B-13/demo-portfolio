import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Shield, Plus, Trash2, Edit3, Check, RefreshCw, 
  MessageSquare, Layers, BarChart3, ExternalLink, LogOut, CheckCircle, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminModal({ 
  isOpen, 
  onClose, 
  token, 
  setToken, 
  projects, 
  onRefreshProjects, 
  onShowToast 
}) {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'inbox', 'stats'
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Project form state (for Add or Edit)
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    description: '',
    fullDescription: '',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    tags: 'React, Node.js, Express, PostgreSQL',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    challenges: '',
    features: ''
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);
    try {
      const data = await api.loginAdmin(password);
      setToken(data.token);
      localStorage.setItem('portfolio_admin_token', data.token);
      setPassword('');
      onShowToast({ type: 'success', message: 'Logged in to Admin CMS successfully!' });
    } catch (err) {
      setAuthError(err.message || 'Invalid password. Try: admin123');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('portfolio_admin_token');
    onShowToast({ type: 'success', message: 'Logged out of Admin CMS' });
  };

  // Load Messages & Stats when token is active
  useEffect(() => {
    if (!token) return;

    const loadData = async () => {
      try {
        const [msgs, st] = await Promise.all([
          api.getContactMessages(token),
          api.getStats(token)
        ]);
        setMessages(msgs);
        setStats(st);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      }
    };

    loadData();
  }, [token, activeTab]);

  // Form input change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Open Edit Form
  const handleStartEdit = (p) => {
    setIsEditing(true);
    setEditingId(p.id);
    setProjectForm({
      title: p.title || '',
      category: p.category || 'Full Stack',
      description: p.description || '',
      fullDescription: p.fullDescription || '',
      image: p.image || '',
      tags: p.tags || '',
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: Boolean(p.featured),
      challenges: p.challenges || '',
      features: p.features || ''
    });
  };

  // Reset Form
  const handleResetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setProjectForm({
      title: '',
      category: 'Full Stack',
      description: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      tags: 'React, Node.js, Express, PostgreSQL',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      challenges: '',
      features: ''
    });
  };

  // Save Project (Add or Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      alert('Title and description are required.');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && editingId) {
        await api.updateProject(editingId, projectForm, token);
        onShowToast({ type: 'success', message: 'Project updated in database!' });
      } else {
        await api.createProject(projectForm, token);
        onShowToast({ type: 'success', message: 'New project added to database!' });
      }
      handleResetForm();
      onRefreshProjects();
    } catch (err) {
      onShowToast({ type: 'error', message: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.deleteProject(id, token);
      onShowToast({ type: 'success', message: 'Project removed from database' });
      onRefreshProjects();
    } catch (err) {
      onShowToast({ type: 'error', message: err.message });
    }
  };

  // Toggle Message Read
  const handleToggleRead = async (id) => {
    try {
      const updated = await api.toggleMessageRead(id, token);
      setMessages(prev => prev.map(m => m.id === id ? updated : m));
    } catch (err) {
      onShowToast({ type: 'error', message: err.message });
    }
  };

  // Delete Message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteContactMessage(id, token);
      setMessages(prev => prev.filter(m => m.id !== id));
      onShowToast({ type: 'success', message: 'Message removed from database' });
    } catch (err) {
      onShowToast({ type: 'error', message: err.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Admin CMS & Database Portal
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Direct CRUD management over SQLite / PostgreSQL database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        {!token ? (
          /* Authentication Screen */
          <div className="p-8 max-w-md mx-auto text-center space-y-6 my-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                Admin Password Required
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Default password configured in <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">.env</code>: <span className="font-mono text-indigo-600 font-bold">admin123</span>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center font-mono"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-500 font-semibold">{authError}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {isLoading ? 'Verifying...' : 'Unlock CMS Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex gap-4 bg-slate-50/50 dark:bg-slate-950/20 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'projects'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inbox')}
                className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'inbox'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquiries ({messages.length})</span>
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'stats'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Database Analytics</span>
              </button>
            </div>

            {/* Tab 1: Projects Management */}
            {activeTab === 'projects' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Add / Edit Project Form */}
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {isEditing ? <Edit3 className="w-4 h-4 text-indigo-500" /> : <Plus className="w-4 h-4 text-indigo-500" />}
                      <span>{isEditing ? 'Edit Project' : 'Add New Project to Database'}</span>
                    </h4>
                    {isEditing && (
                      <button
                        onClick={handleResetForm}
                        className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProject} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={projectForm.title}
                        onChange={handleFormChange}
                        placeholder="e.g. AI Workflow Platform"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={projectForm.category}
                        onChange={handleFormChange}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="AI / Cloud">AI / Cloud</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Short Summary Description *
                      </label>
                      <input
                        type="text"
                        name="description"
                        required
                        value={projectForm.description}
                        onChange={handleFormChange}
                        placeholder="Brief 1-2 sentence elevator pitch of the project..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Architectural Description & Overview
                      </label>
                      <textarea
                        rows={2}
                        name="fullDescription"
                        value={projectForm.fullDescription}
                        onChange={handleFormChange}
                        placeholder="Detailed technical overview shown in case study modal..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Image URL (Unsplash or direct asset)
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={projectForm.image}
                        onChange={handleFormChange}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        name="tags"
                        value={projectForm.tags}
                        onChange={handleFormChange}
                        placeholder="React, Node.js, PostgreSQL"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        name="liveUrl"
                        value={projectForm.liveUrl}
                        onChange={handleFormChange}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        GitHub Repo URL
                      </label>
                      <input
                        type="text"
                        name="githubUrl"
                        value={projectForm.githubUrl}
                        onChange={handleFormChange}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Key Challenge & Optimization Solved
                      </label>
                      <input
                        type="text"
                        name="challenges"
                        value={projectForm.challenges}
                        onChange={handleFormChange}
                        placeholder="e.g. Optimized database queries with composite indices to drop latency by 50%..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between pt-2">
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={projectForm.featured}
                          onChange={handleFormChange}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Feature on Homepage Spotlight</span>
                      </label>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1.5"
                      >
                        {isLoading ? 'Saving...' : isEditing ? 'Update Project' : 'Save Project'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Existing Projects Table */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                    Existing Projects in Database ({projects.length})
                  </h4>

                  <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {projects.map((p) => (
                      <div key={p.id} className="p-3.5 flex items-center justify-between gap-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover bg-slate-200 dark:bg-slate-800 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                                {p.title}
                              </h5>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {p.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {p.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Inquiries Inbox */}
            {activeTab === 'inbox' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Received Messages ({messages.length})
                  </h4>
                  <span className="text-xs text-slate-500">
                    Stored in Database table <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">ContactMessage</code>
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No contact messages yet. Submit a test message through the frontend form!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div
                        key={m.id}
                        className={`p-4 rounded-xl border transition-all ${
                          m.read
                            ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
                            : 'bg-indigo-50/40 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/60 shadow-sm'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${m.read ? 'bg-slate-400' : 'bg-indigo-600'}`} />
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {m.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              &lt;{m.email}&gt;
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {new Date(m.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="font-semibold text-xs text-indigo-600 dark:text-indigo-400 mb-1">
                          Subject: {m.subject}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                          {m.message}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <button
                            onClick={() => handleToggleRead(m.id)}
                            className="font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                          >
                            Mark as {m.read ? 'Unread' : 'Read'}
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-rose-500 hover:text-rose-700 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Analytics */}
            {activeTab === 'stats' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
                    <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{stats?.projects || 0}</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Projects</div>
                  </div>
                  <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-center">
                    <div className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400">{stats?.messages || 0}</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Inquiries</div>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-center">
                    <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{stats?.unreadMessages || 0}</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Unread Messages</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                    <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats?.skills || 0}</div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">Skills</div>
                  </div>
                </div>

                {/* Categories breakdown */}
                {stats?.categoriesDistribution && (
                  <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                      Projects By Category
                    </h4>
                    <div className="space-y-2">
                      {stats.categoriesDistribution.map((item) => (
                        <div key={item.category} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{item.category}</span>
                          <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
