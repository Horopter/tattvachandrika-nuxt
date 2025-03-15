# Use an official Node runtime as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the Nuxt application code
COPY . .

# Build the Nuxt application
RUN npm run build

# Expose Nuxt port (default is 3000)
EXPOSE 3000

# Start the Nuxt server in production mode
CMD ["npm", "start"]

