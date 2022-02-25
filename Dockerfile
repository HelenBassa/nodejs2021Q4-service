FROM node:16.13.0-alpine3.11
WORKDIR /app
COPY package*.json .
RUN npm install --no-optional && npm cache clean --force
COPY . .
RUN npm run prebuild
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]