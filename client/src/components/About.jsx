import React from 'react';
import { Award, Code, Database, Globe, Server, CheckCircle2, Coffee, Laptop, Zap } from 'lucide-react';

export default function About({ profile }) {
  const pillars = [
    {
      icon: <Server className="w-6 h-6 text-indigo-500" />,
      title: "Resilient Backends",
      description: "Designing fault-tolerant Node.js & Express APIs, microservices, asynchronous worker queues, and event streams."
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      title: "Reactive Frontend",
      description: "Crafting fluid React interfaces with intuitive state management, accessible markup, and optimized Core Web Vitals."
    },
    {
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      title: "Data & Persistence",
      description: "Architecting relational schemas with PostgreSQL, SQLite, and Prisma ORM, indexing queries for sub-50ms latency."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "Cloud & Automation",
      description: "Containerizing services with Docker and deploying to Vercel, Render, and AWS with automated CI/CD pipelines."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering with Purpose & Precision
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A look into my background, engineering philosophy, and how I transform technical challenges into robust products.
          </p>
        </div>

        {/* Top Grid: Bio Story + Stat Cards */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Bio Story */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Bridging the gap between scalable systems and human-centric interfaces.
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {profile?.bio || "I am a full-stack engineer driven by building reliable software that serves real users. Over the years, I've engineered cloud microservices, reactive single-page applications, and high-concurrency databases."}
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Whether building an enterprise observability dashboard from scratch or architecting transactional e-commerce APIs, I prioritize clean architecture, automated testing, and developer ergonomics.
            </p>

            {/* Bullet Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                "Modern React, TypeScript & Vite",
                "Node.js, Express & REST APIs",
                "PostgreSQL, SQLite & Prisma ORM",
                "Containerization with Docker",
                "Clean Code & Unit Testing",
                "Cloud Deployment on Vercel & Render"
              ].map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats Counter Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
                {profile?.yearsExperience || 4}+
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Years of Experience
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-1">
                {profile?.projectsCompleted || 24}+
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Projects Completed
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                {profile?.clientsSatisfied || 18}+
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Happy Collaborators
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 mb-1">
                99.9%
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Uptime Focus
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Four Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500/60 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {pillar.title}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
