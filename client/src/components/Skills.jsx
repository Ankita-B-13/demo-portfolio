import React, { useState } from 'react';
import { 
  Code, FileCode, Globe, Palette, Layout, Server, Terminal, 
  Network, Boxes, Database, Zap, Layers, Container, GitBranch, 
  Cloud, CheckCircle, Cpu, ShieldCheck
} from 'lucide-react';

const iconMap = {
  Code: <Code className="w-5 h-5 text-indigo-500" />,
  FileCode: <FileCode className="w-5 h-5 text-blue-500" />,
  Globe: <Globe className="w-5 h-5 text-cyan-500" />,
  Palette: <Palette className="w-5 h-5 text-pink-500" />,
  Layout: <Layout className="w-5 h-5 text-purple-500" />,
  Server: <Server className="w-5 h-5 text-emerald-500" />,
  Terminal: <Terminal className="w-5 h-5 text-amber-500" />,
  Network: <Network className="w-5 h-5 text-teal-500" />,
  Boxes: <Boxes className="w-5 h-5 text-violet-500" />,
  Database: <Database className="w-5 h-5 text-sky-500" />,
  Zap: <Zap className="w-5 h-5 text-yellow-500" />,
  Layers: <Layers className="w-5 h-5 text-indigo-400" />,
  Container: <Container className="w-5 h-5 text-blue-600" />,
  GitBranch: <GitBranch className="w-5 h-5 text-orange-500" />,
  Cloud: <Cloud className="w-5 h-5 text-sky-400" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-emerald-500" />,
};

export default function Skills({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'DevOps & Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            Technical Repertoire
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A comprehensive overview of my toolset across frontend user experience, backend services, and cloud database infrastructure.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                  : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id || skill.name}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {iconMap[skill.icon] || <Cpu className="w-5 h-5 text-indigo-500" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {skill.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/60 dark:border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                Continuous Learning & Best Practices
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Always evaluating emerging frameworks, adhering to Clean Architecture principles, and writing test-covered code.
              </p>
            </div>
          </div>
          <a
            href="#projects"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            See Skills in Action
          </a>
        </div>

      </div>
    </section>
  );
}
