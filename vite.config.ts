import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/


const dynamicRoutes = [
  '/',
  '/login',
  '/register',
  '/reset-password',
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    sitemap({
      hostname: 'https://task-manager-delta-jade-75.vercel.app/', 
      dynamicRoutes,
      robots: [
        {
          userAgent: '*',
          disallow: ['/dashboard', '/settings'],
          allow: ['/', '/login', '/register', '/forgot-password'],
        },
      ],
    }),
  ],
})