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
 * [NodeJs](https://nodejs.org/en/) >= v8.4.0
 * [Yarn](https://yarnpkg.com/en/docs/install#debian-stable)
 * Docker
 * docker-compose

## Usage

Make sure to run `yarn install` before first build or 
each time you change dependencies in package.json.

On first use of this repo, run `npx task build` which will
build docker image.You will have to run `npx task build` each time
you change dependencies in package.json (yarn.lock).

Run `npx task --help` to see all available commands and their description.

## Notice
* make sure you update yarn.lock before building
* use sequelize-cli local to generate migrations (because of timestamp)
