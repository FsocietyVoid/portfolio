import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
<<<<<<< HEAD
    
    
    ],
    base: '/portfolio/',
=======
    
    ],
  base: '/portfolio/',
>>>>>>> b767e89897e2452bbca5a35ffa2b475b5cbfa502
})
