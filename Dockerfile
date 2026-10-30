# Multi-stage Docker build for MixHub Client (2026 Edition)
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# Point client to backend port 5001 inside Docker or host
ENV VITE_API_URL=http://localhost:5001/api
ENV VITE_MAIN_URL=http://localhost:5001/api

RUN npm run build

# Production Nginx serving stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Default nginx SPA rewrite configuration
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
