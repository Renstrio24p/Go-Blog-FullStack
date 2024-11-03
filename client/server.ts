import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';
import compression from 'compression';
import sirv from 'sirv';
import { createServer, ViteDevServer } from 'vite'; // Importing ViteDevServer type

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5179;
const base = process.env.BASE || '/';
const ABORT_DELAY = 10000;

// IIFE to handle asynchronous code
(async () => {
  // Load HTML template and SSR manifest based on environment
  const templateHtml = isProduction
    ? await fs.readFile('./dist/client/index.html', 'utf-8')
    : '';
  const ssrManifest = isProduction
    ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
    : undefined;

  const app = express();
  let vite: ViteDevServer | undefined; // Declare vite with the appropriate type

  // Set up Vite server in development
  if (!isProduction) {
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    });
    app.use(vite.middlewares);
  } else {
    // Use compression and serve static files in production
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

  // Handle all incoming requests
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '');
      let template;
      let render;

      // Load appropriate template and render function
      if (!isProduction) {
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite!.transformIndexHtml(url, template); // Use non-null assertion operator
        render = (await vite!.ssrLoadModule('/src/server.tsx')).render; // Use non-null assertion operator
      } else {
        template = templateHtml;
        // Using `require` to import server.js in production
        render = (await require('./dist/server/server.js')).render; // @ts-ignore
      }

      let didError = false;

      // Render the page
      const { pipe, abort } = render(url, ssrManifest, {
        onShellError() {
          res.status(500).send('<h1>Something went wrong</h1>');
        },
        onShellReady() {
          res.status(didError ? 500 : 200).set({ 'Content-Type': 'text/html' });

          const transformStream = new Transform({
            transform(chunk, encoding, callback) {
              res.write(chunk, encoding);
              callback();
            },
          });

          const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);
          res.write(htmlStart);
          transformStream.on('finish', () => {
            res.end(htmlEnd);
          });
          pipe(transformStream);
        },
        onError(error: Error) {
          didError = true;
          console.error(error);
        },
      });

      // Set a timeout to abort rendering if it takes too long
      setTimeout(() => {
        abort();
      }, ABORT_DELAY);
    } catch (e) {
      vite?.ssrFixStacktrace((e as Error));
      console.error(e);
      res.status(500).end('<h1>Internal Server Error</h1>');
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`SSR React Hydrate Server started at http://localhost:${port}`);
  });
})();
