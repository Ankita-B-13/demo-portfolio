import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';

const roles = [
  'Computer Science Undergraduate',
  'Aspiring Full-Stack Software Engineer',
  'React & Node.js Developer',
  'Data Structures & Algorithms Enthusiast'
];

export default function Hero({ profile }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(90);
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(100);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  const name = profile?.name || 'Ankita';
  const tagline = profile?.tagline || 'Computer Science student passionate about full-stack engineering, algorithms, and building intuitive web software.';

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Software Engineering Internships & Projects</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">{name}</span>
              </h1>
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300">
                  {displayedText}
                </span>
                <span className="w-0.5 h-6 sm:h-7 ml-1 bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              </div>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {tagline} Specializing in crafting reactive frontend applications, microservices with Express & Node.js, and performant relational databases.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 transition-all hover:scale-102 active:scale-98"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all hover:scale-102 active:scale-98"
              >
                <span>Let's Talk</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Icons & Email */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-4 text-slate-500 dark:text-slate-400">
              <a
                href={profile?.github || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={profile?.linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href={profile?.twitter || "https://twitter.com"}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile?.email || 'ankita.cs@example.edu'}`}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 ml-2">
                📍 {profile?.location || 'Bengaluru, India / Remote'}
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Code Card / Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Floating Decorative Pills */}
              <div className="absolute -top-4 -left-4 z-20 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <Code2 className="w-4 h-4" />
                <span>React 19 & Vite</span>
              </div>

              <div className="absolute -bottom-4 -right-4 z-20 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Cpu className="w-4 h-4" />
                <span>Express & PostgreSQL / SQLite</span>
              </div>

              {/* Developer Terminal Box */}
              <div className="rounded-2xl bg-slate-900 dark:bg-slate-900/95 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-slate-300">
                
                {/* Terminal Header */}
                <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-500 text-xs">ankita@student-laptop: ~/portfolio</span>
                  <div className="w-10" />
                </div>

                {/* Terminal Body */}
                <div className="p-5 space-y-3 leading-relaxed">
                  <div>
                    <span className="text-indigo-400">const</span> student = &#123;
                  </div>
                  <div className="pl-4">
                    name: <span className="text-emerald-400">'{name}'</span>,
                  </div>
                  <div className="pl-4">
                    education: <span className="text-emerald-400">'B.Tech / B.S. in Computer Science'</span>,
                  </div>
                  <div className="pl-4">
                    status: <span className="text-amber-300">'Undergraduate Student'</span>,
                  </div>
                  <div className="pl-4">
                    interests: [
                    <div className="pl-4 text-cyan-300">
                      'Full-Stack Dev', 'DSA', 'Databases'
                    </div>
                    ],
                  </div>
                  <div className="pl-4">
                    openToInternships: <span className="text-indigo-400">true</span>,
                  </div>
                  <div className="pl-4">
                    graduatingYear: <span className="text-emerald-400">2027</span>
                  </div>
                  <div>&#125;;</div>
                  <div className="pt-2 text-slate-500">
                    // Excited to build software and learn from world-class teams!
                  </div>
                </div>

                {/* Card Footer Metric */}
                <div className="bg-slate-950/50 p-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white">{profile?.yearsExperience || 2}+</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Years Coding</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-indigo-400">{profile?.projectsCompleted || 14}+</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Projects</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-emerald-400">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Dedication</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
