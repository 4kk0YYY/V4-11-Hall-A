import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    base: '/V4-11-Hall-A/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                assetFileNames: `assets/[name].[hash].[ext]`,
                chunkFileNames: `assets/[name].[hash].js`,
                entryFileNames: `assets/[name].[hash].js`,
            }
        }
    }
})