# pull official base image
FROM node:12-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
RUN npm install react-scripts -g

# add app
COPY frontend ./

# start app
CMD ["npm", "start"]