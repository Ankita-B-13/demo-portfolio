# 🚀 Full-Stack Personal Portfolio Website

A modern, high-performance personal portfolio website built with a **React 19 (Vite) frontend**, an **Express.js (Node.js) REST API backend**, and **Prisma ORM** supporting **SQLite (local zero-setup)** and **PostgreSQL (production)**.

Includes a live **Admin CMS Dashboard** for direct project CRUD management and contact message inspection!

---

## 🌟 Key Features

### 💻 Frontend (React + Vite + Tailwind CSS)
- **High-Impact Hero Section**: Dynamic typewriter cycling through engineering specializations, floating tech badges, resume download, and availability indicator.
- **Interactive About Me**: Core engineering pillars, developer story, and real-time impact statistics (years of experience, completed projects, uptime focus).
- **Categorized Skills Matrix**: Interactive category filtering (Frontend, Backend, Database & Cloud, DevOps & Tools) with visual percentage meters.
- **Projects Showcase & Case Study Modal**:
  - Filter by category (*All*, *Full Stack*, *Frontend*, *Backend*, *AI / Cloud*).
  - Live instantaneous search by keyword or technology stack.
  - Project cards with live demo & GitHub repository links.
  - Case Study modal with architecture breakdown, key features, and challenge resolutions.
- **Career & Education Timeline**: Chronological journey showcasing work history, achievements, and degrees.
- **Secure Contact Form**:
  - Input validation (name, email, subject, min 10-char message).
  - Character counter & real-time error feedback.
  - Client-side & server-side rate-limiting to prevent spam.
  - Instant submission feedback via custom Toast notifications.
- **Dark / Light Theme Toggle**: Persistent theme choice saved in `localStorage` and synchronized with system preferences.
- **Fully Responsive**: Optimized for mobile, tablet, laptop, and ultra-wide displays.

### 🛡️ Backend & Database (Node.js, Express & Prisma ORM)
- **RESTful API**: Structured endpoints for projects, contact messages, developer profile, skills, and admin metrics.
- **Admin CMS Dashboard**:
  - Protected with passcode authentication (`admin123` by default).
  - **Create, Read, Update, and Delete (CRUD)** projects directly through the UI.
  - **Message Inbox**: View real-time inquiries submitted through the contact form, toggle read/unread status, and delete messages.
  - **Analytics**: Real-time project counts, message counts, and category distribution.
- **Database Flexibility**:
  - Zero-configuration local database out of the box using **SQLite** (`dev.db`).
  - Seamless 1-line switch to **PostgreSQL** (Supabase, Neon, Render, or Heroku) for production.
- **Security & Reliability**:
  - Rate limiting on contact form endpoints (`express-rate-limit`).
  - Security headers via `helmet`.
  - CORS configuration for cross-origin client integration.

---

## 🏗️ Architecture Overview

```text
├── client/                     # Frontend Application (React 19 + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation, theme toggle & CMS trigger
│   │   │   ├── Hero.jsx        # Typewriter hero, CTAs & social links
│   │   │   ├── About.jsx       # Bio story, metrics & engineering pillars
│   │   │   ├── Skills.jsx      # Filterable skills & proficiency meters
│   │   │   ├── Projects.jsx    # Project grid, search & filters
│   │   │   ├── ProjectModal.jsx# Case study architectural details modal
│   │   │   ├── Experience.jsx  # Career and education timeline
│   │   │   ├── Contact.jsx     # Validated contact form & direct cards
│   │   │   ├── AdminModal.jsx  # Admin CMS dashboard (Projects & Inbox)
│   │   │   ├── Footer.jsx      # Navigation, socials & back-to-top
│   │   │   ├── Icons.jsx       # SVG brand icons (GitHub, LinkedIn, Twitter)
│   │   │   └── Toast.jsx       # Feedback toast notification system
│   │   ├── services/
│   │   │   └── api.js          # Centralized API service layer
│   │   ├── App.jsx             # Root layout & global state
│   │   ├── index.css           # Tailwind CSS imports & theme styles
│   │   └── main.jsx            # React root mount
│   ├── vite.config.js          # Vite configuration with API proxy
│   └── package.json
│
├── server/                     # Backend API Service (Node.js + Express)
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema (SQLite & PostgreSQL)
│   │   └── seed.js             # Rich seed script with sample data
│   ├── src/
│   │   ├── routes/
│   │   │   ├── projects.js     # Project CRUD endpoints
│   │   │   ├── contact.js      # Contact form handling & inbox
│   │   │   ├── profile.js      # Profile details & skills
│   │   │   ├── auth.js         # Admin login & JWT verification
│   │   │   └── stats.js        # Dashboard metrics
│   │   ├── middleware/
│   │   │   └── auth.js         # Admin route protection
│   │   ├── db.js               # Prisma client singleton
│   │   └── server.js           # Express application & static SPA serving
│   ├── .env                    # Local environment variables
│   ├── .env.example            # Environment variables template
│   ├── test-api.js             # Automated API test suite
│   └── package.json
│
├── vercel.json                 # Vercel deployment configuration
├── render.yaml                 # Render 1-click full-stack deployment
├── netlify.toml                # Netlify frontend configuration
├── Procfile                    # Heroku / Railway web process
└── package.json                # Root orchestration scripts
```

---

## ⚡ Quickstart Guide (Local Development)

### Prerequisites
- **Node.js** (v18 or higher — tested on Node v26)
- **npm** (v9 or higher)

### 1. Install All Dependencies
From the root directory, run:
```bash
npm run install:all
```
*(Or manually run `npm install` in the root, `client/`, and `server/` folders).*

### 2. Initialize Database & Seed Sample Projects
```bash
cd server
npx prisma db push
node prisma/seed.js
cd ..
```
*This creates the local SQLite database (`server/prisma/dev.db`) and seeds 6 realistic projects, 17 skills, developer profile, and an inbox message.*

### 3. Run Development Environment
From the root directory:
```bash
npm run dev
```
This concurrently starts:
- 🌐 **Frontend (Vite)**: [http://localhost:5173](http://localhost:5173)
- 🚀 **Backend API**: [http://localhost:5000](http://localhost:5000)

*API requests from the frontend (`/api/*`) are automatically proxied to the backend on port 5000.*

---

## 🔑 Admin CMS Portal

1. Click the **CMS** / **Admin** button in the top navigation bar.
2. Enter the admin password:
   ```text
   admin123
   ```
   *(Configurable in `server/.env` via `ADMIN_PASSWORD`).*
3. Once logged in, you can:
   - **Add New Projects**: Title, category, description, image URL, GitHub link, demo link, tech tags, and challenges.
   - **Edit or Delete Projects**: Updates appear on the live site instantly.
   - **Read Messages**: View all inquiries submitted through the contact form, toggle read status, and delete messages.
   - **View Analytics**: Track database counts and category breakdowns.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | None | API health status & uptime |
| `GET` | `/api/projects` | None | Get all projects (supports `?category=`, `?search=`, `?featured=`) |
| `GET` | `/api/projects/categories`| None | List unique project categories |
| `GET` | `/api/projects/:id` | None | Get detailed project by ID |
| `POST` | `/api/projects` | Admin | Create a new project |
| `PUT` | `/api/projects/:id` | Admin | Update an existing project |
| `DELETE` | `/api/projects/:id` | Admin | Delete a project from database |
| `POST` | `/api/contact` | Rate Limited | Submit a contact form inquiry |
| `GET` | `/api/contact` | Admin | List all received contact messages |
| `PATCH` | `/api/contact/:id/read` | Admin | Toggle message read/unread status |
| `DELETE` | `/api/contact/:id` | Admin | Delete a contact message |
| `GET` | `/api/profile` | None | Get developer profile and social links |
| `PUT` | `/api/profile` | Admin | Update profile information |
| `GET` | `/api/profile/skills` | None | Get skills grouped by category |
| `POST` | `/api/auth/login` | None | Authenticate admin with password |
| `GET` | `/api/stats` | Admin | Get dashboard totals & metrics |

---

## 🗄️ Switching from SQLite to PostgreSQL (Production)

To connect to **PostgreSQL** (e.g., Neon, Supabase, Render PostgreSQL, AWS RDS, or Heroku Postgres):

1. In `server/prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update your `server/.env` (or cloud hosting environment variable):
   ```env
   DATABASE_URL="postgresql://username:password@hostname:5432/dbname?sslmode=require"
   ```
3. Sync schema and seed:
   ```bash
   cd server
   npx prisma db push
   node prisma/seed.js
   ```

---

## 🚀 Deployment Guide

### Option 1: Render (Recommended for Full-Stack 1-Click)
1. Push this repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) -> **New** -> **Blueprint**.
3. Select your repository. Render will automatically read `render.yaml` and configure the Web Service with build & start commands!
4. *(Optional)* Add a free PostgreSQL database on Render and set `DATABASE_URL`.

### Option 2: Vercel (Frontend) + Render / Railway (Backend)
1. **Deploy Backend**:
   - Push to GitHub and deploy `server/` to [Render](https://render.com) or [Railway](https://railway.app).
   - Set environment variables (`PORT=5000`, `NODE_ENV=production`, `DATABASE_URL`).
2. **Deploy Frontend on Vercel**:
   - Import your repo on [Vercel](https://vercel.com).
   - Root directory: `client` (or use the root `vercel.json`).
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Set environment variable `VITE_API_URL` if hosting backend on a separate domain.

### Option 3: Heroku / Railway Unified Deployment
The project includes a `Procfile`:
```text
web: cd server && npm start
```
Run the client build command before starting:
```bash
npm run build:client
```
The Express server automatically detects `client/dist` and serves both the REST API and the React single-page application from the same origin!

---

## 🧪 Testing

Run the automated API test suite:
```bash
# In one terminal, start the server:
cd server
npm start

# In a second terminal, execute the test suite:
node test-api.js
```
All endpoints will be validated with clear pass/fail status.

---

## 📄 License
MIT License. Free to use and customize for your personal portfolio.
