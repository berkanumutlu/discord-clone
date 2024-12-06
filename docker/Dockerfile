# Use Node.js 20.18.0 as base image
FROM node:20.18.0-alpine

# Set working directory
WORKDIR /user/local/app

# Copy application files
COPY src/app ./

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000
# Prisma Studio runs on port 5555 by default
EXPOSE 5555

# Start the application in development mode
CMD ["npm", "run", "dev"]