# syntax=docker/dockerfile:1

# ---------- shared deps ----------
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ---------- development (hot-reload dev server) ----------
FROM node:24-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci
EXPOSE 4200
# Bind to all interfaces so the server is reachable from the host, and poll
# for file changes (bind-mount events aren't reliably propagated on Windows).
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "1000"]

# ---------- production build ----------
FROM deps AS build
COPY . .
RUN npm run build

# ---------- production runtime (static files on nginx) ----------
FROM nginx:alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/my-portfolio/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
