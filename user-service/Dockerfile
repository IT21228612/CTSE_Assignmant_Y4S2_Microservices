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
ARG JWT_SECRET
ARG EMAIL_USER
ARG EMAIL_PASS
ARG FRONTEND_URL

ENV PORT=${PORT}
ENV MONGO_URL=${MONGO_URL}
ENV DEV_MODE=${DEV_MODE}
ENV JWT_SECRET=${JWT_SECRET}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}
ENV FRONTEND_URL=${FRONTEND_URL}

# 6. Expose the container port
EXPOSE 5000

# 7. Run the Application
CMD ["node", "src/app.js"]
