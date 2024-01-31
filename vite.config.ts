import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  resolve: {
    alias: [
      { find: '@store', replacement: resolve(__dirname, 'src/store') },
      { find: '@types', replacement: resolve(__dirname, 'src/types') },
      { find: '@enums', replacement: resolve(__dirname, 'src/enums') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      {
        find: '@components',
        replacement: resolve(__dirname, 'src/components'),
      },
    ],
  },
})
