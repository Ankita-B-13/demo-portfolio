const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing records
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.contactMessage.deleteMany();

  // Create Profile
  const profile = await prisma.profile.create({
    data: {
      name: "Ankita",
      title: "Computer Science Undergraduate & Aspiring Full-Stack Developer",
      tagline: "Computer Science student passionate about full-stack engineering, algorithms, and building intuitive web software.",
      bio: "I am a Computer Science undergraduate student with strong foundations in Data Structures, Algorithms, and modern web development (React, Node.js, Express, and PostgreSQL/SQLite). I love learning new technologies, contributing to impactful projects, and solving real-world challenges through code.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      email: "ankita.cs@example.edu",
      phone: "+1 (555) 014-9876",
      location: "Bengaluru, India / Remote",
      github: "https://github.com/ankita-dev-cs",
      linkedin: "https://linkedin.com/in/ankita-dev-cs",
      twitter: "https://twitter.com/ankita_dev_cs",
      resumeUrl: "#",
      yearsExperience: 2,
      projectsCompleted: 14,
      clientsSatisfied: 10,
      availableForHire: true,
    }
  });

  console.log(`✅ Created Profile: ${profile.name}`);

  // Create Skills
  const skillsData = [
    // Frontend
    { name: "React.js", category: "Frontend", proficiency: 95, icon: "Code" },
    { name: "TypeScript / JavaScript", category: "Frontend", proficiency: 92, icon: "FileCode" },
    { name: "Next.js", category: "Frontend", proficiency: 88, icon: "Globe" },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 95, icon: "Palette" },
    { name: "HTML5 / Modern CSS", category: "Frontend", proficiency: 98, icon: "Layout" },

    // Backend
    { name: "Node.js / Express.js", category: "Backend", proficiency: 92, icon: "Server" },
    { name: "Python / FastAPI", category: "Backend", proficiency: 85, icon: "Terminal" },
    { name: "RESTful & GraphQL APIs", category: "Backend", proficiency: 90, icon: "Network" },
    { name: "Microservices", category: "Backend", proficiency: 82, icon: "Boxes" },

    // Database & Cloud
    { name: "PostgreSQL", category: "Database & Cloud", proficiency: 88, icon: "Database" },
    { name: "MongoDB", category: "Database & Cloud", proficiency: 85, icon: "Database" },
    { name: "Redis Caching", category: "Database & Cloud", proficiency: 80, icon: "Zap" },
    { name: "Prisma ORM", category: "Database & Cloud", proficiency: 90, icon: "Layers" },

    // DevOps & Tools
    { name: "Docker & Containers", category: "DevOps & Tools", proficiency: 84, icon: "Container" },
    { name: "Git & GitHub CI/CD", category: "DevOps & Tools", proficiency: 92, icon: "GitBranch" },
    { name: "Vercel / Render / AWS", category: "DevOps & Tools", proficiency: 86, icon: "Cloud" },
    { name: "Jest / Unit Testing", category: "DevOps & Tools", proficiency: 82, icon: "CheckCircle" },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ Seeded ${skillsData.length} skills`);

  // Create Projects
  const projectsData = [
    {
      title: "DevFlow - Cloud-Native CI/CD Analytics",
      description: "Real-time DevOps observability platform monitoring microservice deployments, pipeline runtimes, and cluster health metrics.",
      fullDescription: "DevFlow aggregates continuous integration events, build logs, and health metrics across multi-cloud environments. Features interactive telemetry charts, automated alerting webhooks, role-based access control, and dark-mode first UI.",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      tags: "React, Node.js, Express, Docker, PostgreSQL, TailwindCSS, Chart.js",
      liveUrl: "https://example.com/demo/devflow",
      githubUrl: "https://github.com/example/devflow",
      featured: true,
      challenges: "Optimized high-frequency time-series queries by implementing write-through Redis caching and composite database indexing, reducing dashboard latency by 68%.",
      features: "Multi-cluster metrics visualization, Real-time WebSocket deployment status, Automated GitHub webhook listener, Custom notification channels (Slack, Discord)",
      order: 1,
    },
    {
      title: "NexusMart - E-Commerce Microservices Engine",
      description: "High-performance modern e-commerce storefront with instantaneous product search, cart synchronization, and secure Stripe checkout.",
      fullDescription: "NexusMart is a scalable e-commerce platform built to handle high concurrency during flash sales. Implements optimistic UI updates, inventory reservations, Stripe Elements checkout, and automated customer invoice generation.",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1000&q=80",
      tags: "React, Node.js, Express, Stripe, PostgreSQL, Redis, TailwindCSS",
      liveUrl: "https://example.com/demo/nexusmart",
      githubUrl: "https://github.com/example/nexusmart",
      featured: true,
      challenges: "Prevented race conditions during inventory checkout using database transactions and atomic decrement operations in PostgreSQL.",
      features: "Debounced multi-attribute faceted product search, Real-time inventory lock during checkout, Stripe webhook payment verification, Responsive mobile drawer cart",
      order: 2,
    },
    {
      title: "CogniSense - AI Document Knowledge Assistant",
      description: "RAG-powered conversational assistant capable of synthesizing and answering complex questions across multi-gigabyte document corpora.",
      fullDescription: "CogniSense utilizes semantic chunking and dense vector embeddings to provide accurate, grounded answers from uploaded technical PDFs, research papers, and policy handbooks with verified citation links.",
      category: "AI / Cloud",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80",
      tags: "React, Python, Node.js, Vector DB, LangChain, TailwindCSS",
      liveUrl: "https://example.com/demo/cognisense",
      githubUrl: "https://github.com/example/cognisense",
      featured: true,
      challenges: "Engineered context window truncation safeguards and hallucination guardrails to guarantee 99.2% source citation fidelity.",
      features: "Dynamic drag-and-drop PDF ingestion, Semantic vector search with hybrid BM25 reranking, Source citation popovers, Streaming token responses",
      order: 3,
    },
    {
      title: "PulseSync - Collaborative Real-Time Whiteboard",
      description: "Ultra-responsive infinite-canvas whiteboard with live cursor tracking, shape tools, and low-latency multiplayer synchronization.",
      fullDescription: "PulseSync allows distributed engineering teams to brainstorm system designs and sketch flowcharts synchronously. Uses CRDTs (Conflict-free Replicated Data Types) for seamless offline and online sync.",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80",
      tags: "React, TypeScript, WebSockets, HTML5 Canvas, TailwindCSS",
      liveUrl: "https://example.com/demo/pulsesync",
      githubUrl: "https://github.com/example/pulsesync",
      featured: false,
      challenges: "Designed custom quadtree spatial indexing on the HTML5 canvas to maintain smooth 60fps rendering even with 5,000+ active vector nodes.",
      features: "Infinite pan/zoom virtual canvas, Multi-user live cursor and presence indicators, Vector shape drawing and sticky notes, High-res SVG/PNG export",
      order: 4,
    },
    {
      title: "GuardGate - Zero-Trust API Security Gateway",
      description: "Lightweight reverse proxy and edge API gateway providing rate-limiting, IP reputation checks, and token authentication.",
      fullDescription: "GuardGate protects internal microservices against DDoS attacks and brute-force intrusions. Features token bucket rate-limiting, distributed session management with Redis, and automated metrics collection for Grafana.",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
      tags: "Node.js, Express, Redis, JWT, Docker, Prometheus",
      liveUrl: "https://example.com/demo/guardgate",
      githubUrl: "https://github.com/example/guardgate",
      featured: false,
      challenges: "Engineered sub-5ms proxy overhead using asynchronous non-blocking Node.js streams and pipelined Redis transactions.",
      features: "Token bucket rate-limiting per IP and API key, Dynamic JWT blacklist validation, Upstream service health checks, Prometheus telemetry exporter",
      order: 5,
    },
    {
      title: "AetherWeather - 3D Geospatial Climate Visualizer",
      description: "Immersive 3D globe visualization rendering real-time atmospheric conditions, storm trajectories, and thermal heatmaps.",
      fullDescription: "AetherWeather renders interactive 3D WebGL globes visualizing wind currents, UV index, and 7-day meteorological forecasts mapped onto realistic terrain geometry.",
      category: "Frontend",
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1000&q=80",
      tags: "React, Three.js, OpenWeather API, TailwindCSS, WebGL",
      liveUrl: "https://example.com/demo/aetherweather",
      githubUrl: "https://github.com/example/aetherweather",
      featured: false,
      challenges: "Shader optimization to ensure fluid 60 FPS performance across mobile and desktop GPUs without overheating.",
      features: "Interactive 3D WebGL globe with orbit controls, Live meteorological radar overlays, City search with geolocation fallback, Responsive glassmorphism interface",
      order: 6,
    }
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ Seeded ${projectsData.length} projects`);

  // Sample contact message
  await prisma.contactMessage.create({
    data: {
      name: "Campus Recruiter",
      email: "recruiter@innovatetech.example.com",
      subject: "Software Engineering Internship Discussion",
      message: "Hi Ankita! We reviewed your full-stack projects and would love to invite you for an internship interview with our engineering team.",
      read: false,
    }
  });
  console.log('✅ Seeded sample contact message');

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

