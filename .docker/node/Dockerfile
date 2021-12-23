# Common build stage
FROM node:lts-alpine

ENV NODE_ENV development

COPY . ./app

WORKDIR /app

RUN yarn
RUN yarn add sass -g

EXPOSE 3000

CMD ["npm", "run", "dev"]