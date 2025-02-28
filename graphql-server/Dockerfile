# Use official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Copy .proto files to dist/grpc
RUN mkdir -p dist/grpc && cp -r src/grpc/*.proto dist/grpc/

# Use a lightweight Node.js runtime image
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
