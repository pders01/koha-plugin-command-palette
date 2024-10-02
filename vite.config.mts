import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'CommandPaletteBundle',
            fileName: 'main',
            formats: ['umd'],
        },
        outDir: './Koha/Plugin/Xyz/Paulderscheid/CommandPalette/assets/',
        sourcemap: true,
        rollupOptions: {
        },
    },
});