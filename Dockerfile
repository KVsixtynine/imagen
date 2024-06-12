# Stage 1: Build the Node.js application
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies 
# You might need to add --unsafe-perm if you encounter permission errors during installation
RUN npm install --unsafe-perm

# Copy the rest of the application code
COPY . .

# Stage 2: Create a minimal production image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Use the existing "node" user
USER node

# Copy the built application from the build stage
COPY --from=build /app .

# Expose the port your server is running on (7860 as required by Hugging Face Spaces)
EXPOSE 7860

# Start the Node.js application
CMD [ "npm", "start" ]
