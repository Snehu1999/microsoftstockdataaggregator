# Use the official Node.js image as the base image
FROM node:16.17.0-alpine 
# If you're using M1, M2 Mac, try this: 
# FROM  --platform=linux/amd64 node:16.14.0-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the port
EXPOSE 4000

# Start the application
CMD [ "node", "server.js" ]
