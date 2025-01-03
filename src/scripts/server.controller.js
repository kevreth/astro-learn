import { createServer } from 'http-server';
let server;

export async function startStaticServer(port = 3000, root = './dist') {
  return new Promise((resolve, reject) => {
    server = createServer({ root });
    server.listen(port, (err) => {
      if (err) {
        console.error("Error starting server:", err);
        return reject(err);
      }
      console.log(`Server started on http://localhost:${port}`);
      resolve(`Server started on http://localhost:${port}`);
    });
  });
}

export async function stopStaticServer() {
  return new Promise((resolve, reject) => {
    if (server) {
      console.log("Stopping server...");
      server.close((err) => {
        if (err) {
          console.error("Error stopping server:", err);
          return reject(err);
        }
        console.log("Server stopped");
        resolve('Server stopped');
      });
    } else {
      console.log("No server to stop");
      resolve('No server to stop');
    }
  });
}
