# Data Soul

This is the source code for the "Data Soul" multi-vendor electronics store.

## Technical Project Report
Please refer to [REPORT.md](./REPORT.md) for the full technical project documentation (in Kazakh), including:
- Database Schema
- Infrastructure Configuration (Docker, Nginx)
- CI/CD Pipeline (GitHub Actions)

## Running the Project

### Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server (Express + Vite):
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

### Production
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Start the server:
   ```bash
   npm start
   ```
   (Note: You need to update `package.json` start script to `NODE_ENV=production tsx server.ts` or compile TS to JS).

## Features
- **Home Page**: Featured products, categories.
- **Admin Dashboard**: Sales charts, vendor moderation.
- **API**: REST API for products and stats (simulated with SQLite).
