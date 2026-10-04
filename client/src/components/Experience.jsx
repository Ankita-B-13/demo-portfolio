import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      type: 'work',
      role: 'Senior Full-Stack Engineer',
      company: 'ScaleVelocity Technologies',
      location: 'San Francisco, CA (Remote)',
      period: '2024 — Present',
      description: 'Leading the core platforms engineering team building distributed microservices, CI/CD telemetry dashboards, and real-time collaborative web tools.',
      achievements: [
        'Architected high-throughput ingestion pipelines handling 5M+ daily webhook events using Node.js streams and Redis queues.',
        'Spearheaded the migration of monolithic dashboard to modular React 19 micro-frontends, decreasing initial bundle load by 45%.',
        'Mentored 6 junior/mid engineers and established standardized ESLint, Jest, and CI testing benchmarks.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis', 'AWS']
    },
    {
      type: 'work',
      role: 'Full-Stack Software Engineer',
      company: 'HyperCraft Digital Studio',
      location: 'New York, NY',
      period: '2022 — 2024',
      description: 'Designed and deployed enterprise-grade SaaS web applications and e-commerce platforms for venture-backed startups.',
      achievements: [
        'Built full-stack transactional payment workflows with Stripe API and webhooks, processing over $2.5M in ARR transactions.',
        'Refactored legacy SQL schemas into PostgreSQL and implemented Prisma ORM migrations with zero downtime.',
        'Integrated real-time notification microservices with WebSockets and Server-Sent Events (SSE).'
      ],
      technologies: ['TypeScript', 'React', 'Node.js', 'Prisma', 'PostgreSQL', 'TailwindCSS']
    },
    {
      type: 'work',
      role: 'Frontend & API Developer',
      company: 'NovaBytes Labs',
      location: 'Boston, MA',
      period: '2021 — 2022',
      description: 'Developed interactive user interfaces, customer analytics portals, and RESTful API integrations.',
      achievements: [
        'Developed 12+ responsive client dashboard modules with React, Chart.js, and custom state management.',
        'Authored comprehensive Swagger/OpenAPI documentation for customer-facing REST endpoints.',
        'Improved Lighthouse accessibility scores from 72 to 98 across core production views.'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'REST APIs', 'CSS3']
    },
    {
      type: 'education',
      role: 'B.S. in Computer Science',
      company: 'University of Technology',
      location: 'Boston, MA',
      period: '2017 — 2021',
      description: 'Specialized in Distributed Systems, Data Structures & Algorithms, and Database Management Systems. Graduated Magna Cum Laude.',
      achievements: [
        'Dean\'s Honor List (All Semesters), GPA: 3.85 / 4.0.',
        'Lead developer of University Autonomous Rover robotics team software sub-system.',
        'Published undergraduate paper on distributed consensus mechanisms.'
      ],
      technologies: ['Algorithms', 'Distributed Systems', 'Data Structures', 'C++', 'Python']
    }
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
            Journey & Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Experience & Education
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            A chronological timeline of roles where I solved complex problems, scaled web infrastructure, and delivered business value.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 md:ml-48 space-y-12">
          {experiences.map((item, idx) => {
            const isEdu = item.type === 'education';

            return (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                
                {/* Timeline Dot Indicator */}
                <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isEdu
                    ? 'bg-amber-500 text-white'
                    : 'bg-indigo-600 text-white'
                }`}>
                  {isEdu ? <GraduationCap className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                </div>

                {/* Left Side Period Label (Visible on large screens) */}
                <div className="sm:absolute sm:-left-32 md:sm:-left-48 sm:top-2 text-xs font-bold text-slate-500 dark:text-slate-400 sm:text-right sm:w-24 md:w-40 mb-1 sm:mb-0">
                  {item.period}
                </div>

                {/* Main Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {item.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet achievements */}
                  <div className="space-y-2">
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
