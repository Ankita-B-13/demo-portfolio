import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  // Dark mode state: default to dark or saved preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Data states
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Admin CMS state
  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('portfolio_admin_token') || null;
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Apply dark mode class to root document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  }, [darkMode]);

  // Fetch initial data
  const loadData = useCallback(async () => {
    try {
      // Load profile
      try {
        const prof = await api.getProfile();
        setProfile(prof);
      } catch (e) {
        console.warn('Could not load profile from API, using fallback', e);
      }

      // Load skills
      try {
        const skillsData = await api.getSkills();
        setSkills(skillsData.skills || []);
      } catch (e) {
        console.warn('Could not load skills from API', e);
      }

      // Load projects
      try {
        setIsLoadingProjects(true);
        const projData = await api.getProjects();
        setProjects(projData);
      } catch (e) {
        console.warn('Could not load projects from API', e);
      } finally {
        setIsLoadingProjects(false);
      }
    } catch (err) {
      console.error('Initial data load error:', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Refresh projects callback for Admin CMS
  const refreshProjects = async () => {
    try {
      const updated = await api.getProjects();
      setProjects(updated);
    } catch (err) {
      console.error('Failed to refresh projects:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={Boolean(adminToken)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} isLoading={isLoadingProjects} />
        <Experience />
        <Contact profile={profile} onShowToast={(t) => setToast(t)} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Admin CMS Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        token={adminToken}
        setToken={setAdminToken}
        projects={projects}
        onRefreshProjects={refreshProjects}
        onShowToast={(t) => setToast(t)}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
