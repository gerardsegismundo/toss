FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY client/package.json client/

RUN npm install && npm install --prefix client

EXPOSE 5000 8080

CMD ["npm", "run", "dev"]
