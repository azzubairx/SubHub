import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // احذف الـ base أثناء التطوير المحلي، وأعده فقط عند رفع المشروع لـ Github Pages
  // base: '/subnirvana/', 
})