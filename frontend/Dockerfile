FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies separately to leverage Docker layer cache
COPY package*.json ./
RUN npm ci

# Copy the rest of the source
COPY . .

# Vite dev server default port
EXPOSE 5173

# Run Vite dev server and listen on all interfaces
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]