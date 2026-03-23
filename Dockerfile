# Use official Node.js 18 image on Alpine Linux
# Alpine = small (~170MB), secure, production-ready
FROM node:18-alpine

# Set working directory inside container
# All subsequent commands run from /app
WORKDIR /app

# Copy package files FIRST (for layer caching)
# Dependencies change rarely; code changes often.
# This ensures npm ci is only re-run when deps actually change.
COPY package*.json ./

# Install exact dependency versions from lock file
# npm ci = clean install: faster, deterministic, no surprises
RUN npm ci

# Copy the rest of the application source code
# Placed AFTER npm ci so code changes don't bust the dep cache
COPY . .

# Expose the port the app listens on
# (process.env.PORT defaults to 3000 in src/index.js)
EXPOSE 3000

# Command to start the server
CMD ["node", "src/index.js"]
