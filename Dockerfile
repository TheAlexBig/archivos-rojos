# Base image
FROM node:alpine


# Set the working directory
RUN mkdir /app
WORKDIR /app

# Copy package.json 
COPY package.json ./
# Copy yarn.lock
COPY yarn.lock ./

# Copy babel config
COPY babel.config.js ./

# Copy source project
COPY src ./src

# Install dependencies
RUN yarn install

# Build the project
RUN yarn build

RUN rm -rf ./src

# Expose the application port
EXPOSE $BACKEND_PORT

# Start the application
CMD ["sh", "-c", "yarn start"]
