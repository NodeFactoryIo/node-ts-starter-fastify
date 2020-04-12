![NodeFactory](banner.png)

# NodeJs Typescript Starter
[![CircleCI](https://circleci.com/gh/NodeFactoryIo/node-ts-starter/tree/master.svg?style=shield)](https://circleci.com/gh/NodeFactoryIo/node-ts-starter/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/NodeFactoryIo/node-ts-starter/badge.svg?branch=master)](https://coveralls.io/github/NodeFactoryIo/node-ts-starter?branch=master)
[![GitHub stars](https://img.shields.io/github/stars/NodeFactoryIo/node-ts-starter.svg)](https://github.com/NodeFactoryIo/node-ts-starter/stargazers)
[![GitHub license](https://img.shields.io/github/license/NodeFactoryIo/node-ts-starter.svg)](https://github.com/NodeFactoryIo/node-ts-starter/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/NodeFactoryIo/node-ts-starter.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2FNodeFactoryIo%2Fnode-ts-starter)


Starter repository with typescript and express and everything is dockerized.
It also includes CI script that's gonna help you make your production ready docker image.

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
