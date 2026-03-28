// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Detect environment
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Port from environment or default
const port = process.env.PORT || 3000;

// Start server in async function
const start = async () => {
  try {
    await app.prepare();

    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      console.log(`> Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
