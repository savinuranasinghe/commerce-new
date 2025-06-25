# Use Node.js base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port Vite runs on (default is 5173)
EXPOSE 4173

RUN npm run build

# Command to run Vite's development server
CMD ["npm", "run", "preview"]
