# Base image
FROM node:20-alpine

# Create working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy server code
COPY . .

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
