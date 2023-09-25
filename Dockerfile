# Base image
FROM node:alpine


# Set the working directory
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Copy babel config
COPY babel.config.js ./

# Copy source project
COPY src ./src

# Install dependencies
RUN npm install --verbose

# Build the project
RUN npm run build

RUN rm -rf ./src

# Expose the application port
EXPOSE $BACKEND_PORT

# Start the application
CMD ["npm", "start"]
