# ShowWork Frontend

Frontend application for ShowWork, built with React, TypeScript, and Vite.

## Requirements

- Node.js 22+
- npm 10+
- Docker and Docker Compose plugin (optional)

## Local Development

Install dependencies:

```bash
npm ci
```

Start the Vite dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Production Build

Create a production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Docker

### Development Container

Run the app in Docker with live code mounting:

```bash
docker compose up frontend-dev
```

The dev server will be available at `http://localhost:3000`.

### Production Image

Build the production image:

```bash
docker build --target production -t showwork-frontend .
```

If Docker has DNS or registry timeout issues on your machine, use host networking:

```bash
docker build --target production --network=host -t showwork-frontend .
```

Run the production container:

```bash
docker run --rm -p 8080:80 showwork-frontend
```

The app will be available at `http://localhost:8080`.

## Useful Commands

```bash
npm run lint
npm run typecheck
```

## Project Files

- `Dockerfile`: multistage image for development and production
- `compose.yaml`: local Docker workflows
- `nginx.conf`: production Nginx config with SPA route fallback
