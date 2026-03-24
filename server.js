const { createServer } = require("http");
const next = require("next");

const dev = false; // always false in production
const app = next({ dev });
const handle = app.getRequestHandler();

// VERY IMPORTANT: use cPanel's assigned port
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res); // let Next.js handle all routes
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js app running on port ${port}`);
  });
});
