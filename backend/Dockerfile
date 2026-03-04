FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:lts-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app ./

CMD ["npm", "start"]