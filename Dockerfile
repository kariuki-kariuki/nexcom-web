FROM node:22-alpine3.20

WORKDIR /app

COPY . .

# Install pnpm globaly
RUN npm install -g pnpm

# Install node packages
RUN pnpm install

# Initiate build
RUN npm run build

# Expose the frontend port
EXPOSE 3000
EXPOSE 4000
EXPOSE 5000

# command to start while running an image
CMD ["npm", "run", "start"]