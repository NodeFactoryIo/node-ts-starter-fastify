FROM node:14.15-alpine as dev

RUN apk update && apk add --no-cache libpq postgresql-dev g++ make python && rm -rf /var/cache/apk/*

WORKDIR /usr/app

# Install node dependencies - done in a separate step so Docker can cache it.
COPY yarn.lock .
COPY package.json .

RUN yarn install --non-interactive --ignore-scripts --frozen-lockfile && yarn cache clean

COPY . .

RUN yarn run build

FROM node:14.15-alpine as production

RUN apk update && apk add --no-cache libpq postgresql-dev g++ make python && rm -rf /var/cache/apk/*

WORKDIR /app

COPY --from=dev /usr/app/dist /app
COPY --from=dev /usr/app/package.json /app/
COPY --from=dev /usr/app/yarn.lock /app/

RUN chown -R node: .

USER node

RUN yarn install  --non-interactive --ignore-scripts --frozen-lockfile --production && yarn cache clean

CMD ["node", "index.js"]