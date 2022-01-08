FROM node:16.13.0-alpine3.11
WORKDIR /app
COPY package*.json .
RUN npm install --no-optional
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "dev"]