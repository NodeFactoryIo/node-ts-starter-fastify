![NodeFactory](banner.png)

# NodeJs Typescript Starter
![CI check](https://github.com/NodeFactoryIo/node-ts-starter-fastify/workflows/CI%20check/badge.svg?branch=master&event=push)
[![Coverage Status](https://coveralls.io/repos/github/NodeFactoryIo/node-ts-starter-fastify/badge.svg?branch=master)](https://coveralls.io/github/NodeFactoryIo/node-ts-starter-fastify?branch=master)
[![GitHub license](https://img.shields.io/github/license/NodeFactoryIo/node-ts-starter-fastify.svg)](https://github.com/NodeFactoryIo/node-ts-starter-fastify/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/NodeFactoryIo/node-ts-starter-fastify.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FNodeFactoryIo%2Fnode-ts-starter-fastify)


Starter repository for developing fast API services with typescript and fastify.
Docker friendly with default CI configuration.

## Requirements

Following software is required to be installed to use this repo:
 * [NodeJs](https://nodejs.org/en/) >= v12
 * [Yarn](https://yarnpkg.com/en/docs/install#debian-stable)
 * Docker
 * docker-compose

## Usage

- `yarn install` - will run and configure everything for you

#### Database
- use `yarn db:migration:new <class name>` to generate new empty migration file (same goes for entity and subscriber)
- use `docker-compose exec backend yarn db:migration:generate <class name>` to generate new auto generated migration
- `yarn db:migrate` - runs all pending migrations against database
- `yarn db:revert` - reverts last migration, run multiple times to revert everything
- `yarn db:seed` - seeds database with fake data (`src/services/db/seeders`)
- `yarn run test:unit` - runs unit tests with coverage
- `yarn run lint` runs following commands:
   - `yarn run lint:style` - runs eslint against source code
   - `yarn run lint:types` - checks typescript types
- `yarn run start:dev` - runs docker-compose with your server and database, app will autoreload on changes
