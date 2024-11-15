# ------------------- Stage 1: Build Stage ------------------------------
FROM node:21 AS frontend-builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json for dependency installation
COPY package*.json ./

<<<<<<< HEAD
# Install dependencies
RUN npm install

=======
COPY tailwind.config.js ./

COPY postcss.config.js ./

COPY vite.config.js ./

# Install dependencies
RUN npm install

# Run audit

RUN npm audit 

>>>>>>> 5bc0de1 (test)
# Copy the rest of the application code
COPY . .

# ------------------- Stage 2: Final Stage ------------------------------
FROM node:21-slim

# Set the working directory to /app
WORKDIR /app

# Copy built assets and dependencies from frontend-builder stage
COPY --from=frontend-builder /app .

# Copy the .env.sample file to .env.local
<<<<<<< HEAD
COPY .env.docker .env.local

# Expose port 5173 for the Node.js application
EXPOSE 5173

# Define the default command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
=======
# COPY .env.docker .env.local

# Expose port 3000 for the Node.js application
EXPOSE 3000

# Define the default command to run the application in development mode
CMD ["npm", "run", "dev"]
>>>>>>> 5bc0de1 (test)
