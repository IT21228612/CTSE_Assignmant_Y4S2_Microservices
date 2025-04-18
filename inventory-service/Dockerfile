# 1. Use official Node.js LTS image
FROM node:18-slim

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy rest of the source code
COPY . .

# 5. Set environment variables via build-time args
ARG PORT
ARG MONGO_URL
ARG DEV_MODE

ENV PORT=${PORT}
ENV MONGO_URL=${MONGO_URL}
ENV DEV_MODE=${DEV_MODE}

# 6. Expose the container port
EXPOSE 5000

# 7. Run the application
CMD ["node", "src/app.js"]
