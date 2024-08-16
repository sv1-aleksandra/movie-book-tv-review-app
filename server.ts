import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server'; // Importing the main server entry point

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Initializing Angular's CommonEngine for server-side rendering
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // Uncomment the following line to define API endpoints using Express
  // server.get('/api/**', (req, res) => { });

  // Serve static files from the browser distribution folder
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine for server-side rendering
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap, // Using the bootstrap entry point for the Angular app
        documentFilePath: indexHtml, // Path to the server-side rendered index.html
        url: `${protocol}://${headers.host}${originalUrl}`, // Constructing the full URL
        publicPath: browserDistFolder, // Path to the static assets
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }], // Providing the base href for routing
      })
      .then((html) => res.send(html)) // Sending the rendered HTML to the client
      .catch((err) => next(err)); // Handling errors during rendering
  });

  return server; // Returning the Express server instance
}

function run(): void {
  const port = process.env['PORT'] || 4000; // Getting the port from the environment or default to 4000

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run(); // Running the server
