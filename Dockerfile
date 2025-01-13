# Use the official Node.js image as the base image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app for production
RUN npm run build

# Use the Nginx image to serve the built app
FROM nginx:alpine

# Copy the build files from the build stage to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the frontend app
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
