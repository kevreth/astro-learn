import express from 'express';
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
let server;
export const startServer = () => {
  console.log('starting on port ' + PORT)
  return new Promise((resolve, reject) => {
    if (server) return resolve(); // Do nothing if the server is already running
    const app = express();
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('index.html', { root: 'dist' });
    });
    server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      resolve();
    });
    server.on('error', (err) => {
      console.error('Server error:', err);
      reject(err);
    });
  });
};
export const stopServer = () => {
  if (server) {
    server.close(() => {
      console.log('Server has stopped.');
    });
    server = undefined;
  }
};
// Ensure the process does not exit prematurely
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer()
    .then(() => console.log(`Server running on http://localhost:${PORT}`))
    .catch((err) => {
      console.error(`Failed to start server: ${err.message}`);
      process.exit(1);
    });
}