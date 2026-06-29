# Simple Dockerfile for FoodieSquare
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the app with dummy environment variables
# Real values will be provided at runtime
ENV MONGODB_URI="mongodb://dummy:27017/dummy"
ENV NEXTAUTH_SECRET="dummy-secret-for-build-only"
ENV NEXTAUTH_URL="http://localhost:3000"

RUN npm run build

# Remove dummy env vars (they'll be overridden at runtime)
ENV MONGODB_URI=""
ENV NEXTAUTH_SECRET=""
ENV NEXTAUTH_URL=""

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
