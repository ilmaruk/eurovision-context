FROM node:12

COPY frontend/ /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts -g

CMD ["npm", "start"]
