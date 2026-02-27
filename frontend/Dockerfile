# 1. Use an official Node.js image as the base
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package files first (to speed up builds)
COPY package*.json ./

# 4. Install the dependencies
RUN npm install

# 5. Copy the rest of your backend code
COPY . .

# Vite default port is 5173
EXPOSE 5173

# We use --host 0.0.0.0 so the container can be reached from your Mac
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]