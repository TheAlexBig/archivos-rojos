# Base image
FROM node:current-alpine3.18


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Copy babel config
COPY babel.config.js ./

# Copy source project
COPY src ./src

# Update to latest node version
RUN npm i npm@latest -g

# Install dependencies
RUN npm ci

# Build the project
RUN npm run build

RUN rm -rf ./src

# Expose the application port
EXPOSE $BACKEND_PORT

# Start the application
CMD ["npm", "start"]
