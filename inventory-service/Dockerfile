# 1. Use official Node.js LTS image
FROM node:18-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy only package files and install deps (layer caching)
COPY package*.json ./
RUN npm install

# 4. Copy rest of the project files
COPY . .

# 5. Expose app port
EXPOSE 5000

# 6. Run the app
CMD ["node", "src/app.js"]
