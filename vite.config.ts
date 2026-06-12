import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // مهم جداً للنشر على GitHub Pages. قم بتغيير subnirvana لاسم مستودعك.
  base: '/subnirvana/', 
})
