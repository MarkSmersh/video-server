FROM node:latest

COPY . /

RUN ["npm", "i"]

RUN ["npm", "run", "build"]

ENV NODE_ENV="production"

CMD ["npm", "run", "server"]