# UI/UX Designer Portfolio

A modern, unique, and professional portfolio website built with Next.js, TypeScript, and Tailwind CSS. Perfect for showcasing your UI/UX design work to potential employers.

## ✨ Unique Features

- **Dark/Light Mode Toggle** - Seamless theme switching with smooth transitions
- **Interactive Animations** - Smooth scroll animations using Framer Motion
- **Particle Background** - Animated particle system with connecting lines
- **3D Card Effects** - Hover effects on project cards with parallax-like interactions
- **Gradient Animations** - Animated gradient backgrounds and text effects
- **Responsive Design** - Fully responsive across all devices
- **Smooth Scrolling** - Native smooth scroll behavior
- **Interactive Navigation** - Sticky navigation with active states
- **Animated Skill Bars** - Progress bars that animate on scroll
- **Contact Form** - Functional contact form with validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
PortFolio/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact form and info
│   ├── Hero.tsx            # Hero section
│   ├── Navigation.tsx      # Navigation bar
│   ├── ParticleBackground.tsx  # Animated background
│   ├── Projects.tsx        # Projects showcase
│   ├── Skills.tsx          # Skills section
│   └── ThemeProvider.tsx   # Theme context provider
├── package.json
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Customization

### Update Your Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update the title and description
   - Modify button text and links

2. **About Section** (`components/About.tsx`):
   - Update your bio and description
   - Modify stats (projects, experience, clients, awards)

3. **Projects** (`components/Projects.tsx`):
   - Replace project data with your own projects
   - Update images, descriptions, and links
   - Modify tags as needed

4. **Skills** (`components/Skills.tsx`):
   - Update skill categories and proficiency levels
   - Add or remove skills as needed

5. **Contact** (`components/Contact.tsx`):
   - Update email address
   - Add your LinkedIn and GitHub links
   - Connect the form to your backend/email service

### Styling

- Colors can be customized in `tailwind.config.ts`
- Global styles are in `app/globals.css`
- Component-specific styles use Tailwind utility classes

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Intersection Observer** - Scroll animations

## 📝 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

This portfolio can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- Any hosting service that supports Node.js

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Note**: Remember to update all placeholder content, images, and links with your actual information before deploying!

