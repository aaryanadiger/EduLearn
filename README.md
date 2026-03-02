<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

# 🎓 EduLearn

**Empowering minds through quality education and innovative learning experiences.**

EduLearn is a modern, full-stack education platform built with Next.js 16, React 19, and Firebase. It provides an interactive learning ecosystem with courses, live classes, AI-powered learning assistance, and comprehensive student/faculty/admin dashboards.

🌐 **Live Demo:** [edulearn-azure-ten.vercel.app](https://edulearn-azure-ten.vercel.app/)

---

## ✨ Features

- **📚 Course Catalog** — Browse and enroll in courses across multiple disciplines
- **🤖 EduBot** — AI-powered learning assistant for instant help
- **🎥 Live Classes** — Real-time virtual classroom sessions
- **📊 Dashboards** — Separate panels for Students, Faculty, and Admins
- **🔐 Authentication** — Multi-provider auth (Google, GitHub, Apple) via Firebase
- **🛒 Cart System** — Course cart with checkout flow
- **🧠 Mental Health Resources** — Dedicated wellness section for students
- **💼 Career Guidance** — Professional development and career planning tools
- **🌍 Region Selector** — Localized content delivery
- **🎨 Premium UI** — Apple-inspired dark mode design with smooth animations

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Backend/Auth** | [Firebase 12](https://firebase.google.com/) (Auth, Firestore) |
| **Animations** | [GSAP](https://gsap.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Firebase](https://console.firebase.google.com/) project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aaryanadiger/EduLearn.git
   cd EduLearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file and fill in your Firebase credentials:
   ```bash
   cp .env.example .env.local
   ```

   Get your Firebase config from **Firebase Console → Project Settings → General → Your Apps**.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
EduLearn/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── about/          # About page
│   │   ├── courses/        # Course catalog & details
│   │   ├── dashboard/      # Student, Faculty & Admin dashboards
│   │   ├── login/          # Authentication pages
│   │   ├── live-classes/   # Virtual classroom
│   │   ├── mental-health/  # Wellness resources
│   │   ├── career/         # Career guidance
│   │   └── ...
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── data/               # Static data & content
│   └── lib/                # Utilities & Firebase config
├── public/                 # Static assets
├── .env.example            # Environment variable template
├── package.json
└── tsconfig.json
```

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔒 Environment Variables

This project requires Firebase configuration. See [`.env.example`](.env.example) for the full list of required variables.

> **⚠️ Important:** Never commit `.env.local` or any file containing real API keys. The `.gitignore` is configured to prevent this.

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 🔗 Links

- **🌐 Website:** [edulearn-azure-ten.vercel.app](https://edulearn-azure-ten.vercel.app/)
- **👤 Developer:** [Aarya Nadiger](https://github.com/aaryanadiger)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/aaryanadiger">Aarya Nadiger</a>
</p>
