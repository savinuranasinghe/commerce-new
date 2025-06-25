# Use Node.js 20 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json first (leverage Docker layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the port the backend listens on (port 4000)
EXPOSE 4000

# Command to start the backend
CMD ["node", "server.js"]
