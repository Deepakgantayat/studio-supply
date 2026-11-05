FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json
RUN npm install
COPY client ./client
COPY server ./server
EXPOSE 4000 5173
