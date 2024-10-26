# 🎉 Raycast Confetti Webhook Receiver

This project sets up a webhook receiver on your Mac to trigger Raycast's confetti effect when specific events occur in remote applications like Todoist, Pipedrive, or Height.app. Using **Cloudflare Tunnel**, you can establish a persistent, secure URL to make the server accessible from anywhere without exposing your local network directly.

## Features

- Triggers Raycast confetti when receiving specific webhooks
- Uses Cloudflare Tunnel to provide a stable, secure URL

## Requirements

- macOS
- **Node.js** (v12+)
- **Raycast** (with confetti support)
- **Cloudflare account**
- **Todoist API Token**, **Pipedrive API Access**, or **Height.app API Access** (optional, depending on integration)

## Setup instructions

### Install dependencies

1. Clone this repository to your Mac:

   ```bash
   git clone https://github.com/ronilaukkarinen/raycast-confetti-receiver.git
   cd raycast-confetti-receiver
   ```

2. Install the necessary Node.js packages:

   ```bash
   npm install
   ```

### Set up Cloudflare tunnel

Cloudflare Tunnel allows you to create a stable and secure public URL for your local server.

1. **Install Cloudflare tunnel (cloudflared)**:

   ```bash
   brew install cloudflared
   ```

2. **Authenticate with Cloudflare**:

   Log in to Cloudflare to set up authentication:

   ```bash
   cloudflared tunnel login
   ```

   This will open a browser window to authenticate with your Cloudflare account.

3. **Create a new tunnel**:

   Create a new tunnel with a chosen name (e.g., `raycast-confetti`):

   ```bash
   cloudflared tunnel create raycast-confetti
   ```

4. **Route the tunnel to your local server**:

   Configure the tunnel to route traffic to your local server on port `3019` (or the port you're using). Replace `your-subdomain` and `example.com` with your Cloudflare domain and preferred subdomain:

   ```bash
   cloudflared tunnel route dns raycast-confetti your-subdomain.example.com
   ```

5. Add ingress rules for your tunnel:

  ```bash
  nano ~/.cloudflared/config.yml
  ```

  Add the following lines to the file:

  ```yaml
  tunnel: raycast-confetti
  credentials-file: /Users/rolle/.cloudflared/xxxxxxx-your-actual-id-from-the-file.json

  ingress:
    - hostname: raycast-confetti.yourdomain.com
      service: http://localhost:3019
    - service: http_status:404
  ```

6. **Run the tunnel**:

   Start the tunnel to make your server publicly accessible:

   ```bash
   cloudflared tunnel run raycast-confetti
   ```

   Your server should now be accessible at `https://your-subdomain.example.com`.

7. **Run the Server**:

   ```bash
   node confetti-server.mjs
   ```

8. Your server should now listen for incoming POST requests at `https://your-subdomain.example.com/trigger-confetti` and trigger Raycast's confetti effect upon receiving a request.

### Configure webhooks in external servies on a remote server

Please look at the repo [raycast-confetti](https://github.com/ronilaukkarinen/raycast-confetti) for more information on how to set up webhooks in Todoist, Pipedrive, or Height.app.

### Testing the Setup

1. Start `node confetti-server.mjs` on your Mac.
2. Make a POST request to `https://your-subdomain.example.com/trigger-confetti` (e.g., from Todoist or using `curl`):

   ```bash
   curl -X POST https://your-subdomain.example.com/trigger-confetti
   ```

3. If everything is set up correctly, Raycast's confetti effect should trigger on your Mac.

### License

This project is licensed under the MIT License.

### Author

- [Roni Laukkarinen](https://github.com/ronilaukkarinen)