import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

/**
 * Vite plugin to serve PDF files from a dedicated /api/asset/ endpoint.
 * 
 * IDM Prevention Strategy:
 * 1. POST-only — IDM only hooks GET requests, so POST completely bypasses it
 * 2. No 'pdf' in URL path — IDM pattern-matches URLs containing 'pdf'
 * 3. application/octet-stream — IDM sniffs Content-Type for application/pdf
 * 4. No Content-Length — IDM uses this to decide whether to grab the download
 * 5. Direct .pdf URL access is blocked with 403
 */
function servePdfs(): Plugin {
  let publicDir: string;
  return {
    name: 'serve-pdfs',
    enforce: 'pre',
    configResolved(config) {
      publicDir = config.publicDir;
    },
    configureServer(server) {
      // Serve PDFs via /api/asset/ — POST-only, streamed, disguised content type
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';

        if (!rawUrl.startsWith('/api/asset/')) {
          return next();
        }

        // POST-only — IDM never intercepts POST requests
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'text/plain' });
          res.end('Method not allowed');
          return;
        }

        // Also validate XHR header as a secondary guard
        const xRequestedWith = req.headers['x-requested-with'];
        if (xRequestedWith !== 'XMLHttpRequest') {
          res.writeHead(403, { 'Content-Type': 'text/plain' });
          res.end('Direct access is not allowed. Use the in-app viewer.');
          return;
        }

        const pdfPath = decodeURIComponent(rawUrl.replace('/api/asset/', '').split('?')[0]);
        const filePath = path.join(publicDir, pdfPath);

        if (fs.existsSync(filePath) && (pdfPath.toLowerCase().endsWith('.bin') || pdfPath.toLowerCase().endsWith('.pdf'))) {
          res.writeHead(200, {
            // Disguise as generic binary — IDM won't recognize it as PDF
            'Content-Type': 'application/octet-stream',
            // Intentionally NO Content-Length — IDM uses this to decide to grab downloads
            'Content-Disposition': 'inline',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=3600',
          });
          // Stream the file — does NOT block the event loop
          fs.createReadStream(filePath).pipe(res);
          return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Asset not found');
      });

      // Block direct PDF file access from the public directory
      server.middlewares.use((req, res, next) => {
        const rawUrl = (req.url || '').split('?')[0].toLowerCase();
        if ((rawUrl.endsWith('.pdf') || rawUrl.endsWith('.bin')) && !rawUrl.startsWith('/api/')) {
          res.writeHead(403, { 'Content-Type': 'text/plain' });
          res.end('Direct PDF access is blocked. Use the in-app viewer.');
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [servePdfs(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
