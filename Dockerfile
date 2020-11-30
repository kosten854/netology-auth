FROM node:14-alpine

COPY package.json yarn.lock ./
RUN yarn install -s

COPY . ./
RUN yarn build  

CMD [ "node","/dist/src/main.js" ]

