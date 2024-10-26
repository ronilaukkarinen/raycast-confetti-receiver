import http from 'http';
import { exec } from 'child_process';

const PORT = 3019; // Choose a port, e.g., 3001

const requestListener = (req, res) => {
  if (req.url === '/trigger-confetti' && req.method === 'POST') {
    console.log('Confetti trigger received!');

    // Execute command to open Raycast confetti URL
    exec("open 'raycast://confetti'", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error triggering confetti: ${error.message}`);
        res.writeHead(500);
        res.end("Failed to trigger confetti");
        return;
      }
      console.log("🎉 Confetti triggered successfully!");
      res.writeHead(200);
      res.end("🎉 Confetti triggered");
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`🚀 Confetti server is listening on port ${PORT}`);
});
