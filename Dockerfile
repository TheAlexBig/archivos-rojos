# Base image
FROM node:current-alpine3.17


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy babel config
COPY babel.config.js ./

# Copy source project
COPY src ./

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]