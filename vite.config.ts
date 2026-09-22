import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-uploaded-work-image',
        configureServer(server) {
          server.middlewares.use('/api/save-work-image', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { id, dataUrl } = JSON.parse(body);
                  const filename =
                    id === 'lp-01' || id === 'lp-ibrahim'
                      ? 'dr-ibrahim.jpg'
                      : id === 'lp-02' || id === 'lp-nourhan'
                      ? 'dr-nourhan.jpg'
                      : 'dentamax.jpg';

                  const workDir = path.resolve(__dirname, 'public/work');
                  if (!fs.existsSync(workDir)) {
                    fs.mkdirSync(workDir, { recursive: true });
                  }

                  const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                  const filePath = path.join(workDir, filename);
                  fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, path: `/work/${filename}` }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end('Method Not Allowed');
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
