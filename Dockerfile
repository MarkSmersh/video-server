FROM node:20

COPY --chown=app:app . /app

WORKDIR /app

RUN ["npm", "i"]

RUN ["npm", "run", "build"]

ENV PORT="80"

ENV NODE_ENV="production"

CMD ["npm", "run", "server"]