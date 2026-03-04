FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

# Nginx serves static files from /usr/share/nginx/html by default
COPY --from=builder /app/dist /usr/share/nginx/html