# Haseeb Aslam Portfolio

A modern, animated portfolio website for Haseeb Aslam, Senior Software Engineer. Built with Next.js, React, Tailwind CSS, framer-motion, and more.

## Features
- Animated hero, about, experience, skills, projects, and contact sections
- Responsive, clean, and professional design
- Contact form with email sending (EmailJS)
- Book a meeting via Calendly modal
- Social links (LinkedIn, GitHub, X/Twitter, Telegram)
- Lazy loading and scroll-triggered animations for a 3D feel

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [framer-motion](https://www.framer.com/motion/)
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer)
- [EmailJS](https://www.emailjs.com/)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Set up environment variables
Create a `.env.local` file in the root:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
```

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view your site.

## Customization
- Update your profile info, experience, skills, and projects in `app/page.tsx`.
- Replace the placeholder image in `/public/placeholder.svg` with your own photo.
- Update social links and contact info as needed.
- To change the meeting link, update the Calendly URL in the booking section.

## Deployment
You can deploy this project to Vercel, Netlify, or any platform that supports Next.js.

## Contact
For questions or collaboration:
- Email: haseebaslam1320@gmail.com
- [LinkedIn](https://www.linkedin.com/in/haseeb-aslam-622713b6)
- [X (Twitter)](https://x.com/haseebasla64598)
- [GitHub](https://github.com/haseeb1320)

---

© {new Date().getFullYear()} Haseeb Aslam. All rights reserved. 