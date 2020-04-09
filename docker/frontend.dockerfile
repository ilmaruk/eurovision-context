FROM node:12-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY frontend/package*.json ./
RUN npm install
RUN npm install react-scripts -g

COPY frontend ./
CMD ["npm", "start"]