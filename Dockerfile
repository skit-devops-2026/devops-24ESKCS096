# Production Dockerfile for ReVibe
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY server/package.json server/package-lock.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application code
COPY server/ ./

# Expose application port
EXPOSE 8080

# Environment variables
ENV NODE_ENV=production \
    PORT=8080

# Run as non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start the application
CMD ["node", "app.js"]
