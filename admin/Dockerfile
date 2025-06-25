# Use Node.js as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker's caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Expose the port Vite uses
EXPOSE 4173

# Start the Vite development server
CMD ["npm", "run", "preview"]
