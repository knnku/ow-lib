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

# 6. Open the port for our API
EXPOSE 3000

# 7. Start the server (assuming you use nodemon for dev)
# CMD ["npm", "run", "dev"]