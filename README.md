# api-performance

Table of Contents
=================

* [Prerequisites](#prerequisites)
* [Run](#run)
    * [Node](#node)
    * [Express](#express)
    * [Hapi](#hapi)
    * [Koa](#koa)
    * [LoopBack 3](#loopback-3)
    * [LoopBack 4](#loopback-4)
* [Script](#script)

## Prerequisites

You need to have the following programs installed on your machine:
- [Node.js](https://nodejs.org/) (>= 8.11.3)
- [Yarn](https://yarnpkg.com/)

## Run

### Node

```sh
# JS
cd src/node/js
yarn start

# Babel
cd src/node/babel
yarn
yarn start

# TypeScript
cd src/node/ts
yarn
yarn start
```

### Express

```sh
# JS
cd src/express/js
yarn
yarn start

# Babel
cd src/express/babel
yarn
yarn start

# TypeScript
cd src/express/ts
yarn
yarn start
```

### Hapi

```sh
# JS
cd src/hapi/js
yarn
yarn start

# Babel
cd src/hapi/babel
yarn
yarn start

# TypeScript
cd src/hapi/ts
yarn
yarn start
```

### Koa

```sh
# JS
cd src/koa/js
yarn
yarn start

# Babel
cd src/koa/babel
yarn
yarn start

# TypeScript
cd src/koa/ts
yarn
yarn start
```

### LoopBack 3

```sh
# JS
cd src/lb3/js
yarn
yarn start

# Babel
cd src/lb3/babel
yarn
yarn start

# TypeScript
cd src/lb3/ts
yarn
yarn start
```

### LoopBack 4

```sh
# TypeScript
cd src/lb4/ts
yarn
yarn start
```

## Script

Runs the performance test against the given server instance by initiating HTTP requests with `curl`:

```sh
chmod +x perf.sh
./perf.sh <number_of_requests> <host> <port> <http_method> <api_path> [data]
```

Runs the performance tests against all servers in a sequence and logs the results into `results.txt`:

```sh
chmod +x test.sh
# Number of requests defaults to 10000 if omitted 
./test.sh [number_of_requests]
```