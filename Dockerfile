# Base image
FROM node:current-alpine3.17


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy package.json and package-lock.json
COPY babel.config.js ./

# Copy package.json and package-lock.json
COPY src ./

# Install dependencies
RUN npm install

RUN npm run build

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]