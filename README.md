# RS School REST service

## How to install, build and start the REST service in **docker containers**

## Prerequisites

- Install [Docker](https://www.docker.com/).
- Install (if necessary) [Docker compose](https://docs.docker.com/compose/install/).

## Downloading

```bash
git clone https://github.com/HelenBassa/nodejs2021Q4-service.git
```

## Checkout branch

- Checkout to `Task-9.-Authentication-JWT` branch

## Build and start containers for the REST service in docker:

```bash
docker-compose up
```

## Testing the REST service in docker:

```bash
docker container exec docker-basics-app npm run test:auth
```

## How to install and start the REST service on **local machine**

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/HelenBassa/nodejs2021Q4-service.git
```

## Installing NPM modules

```bash
npm install
```

## Running application

```bash
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm test
```

To run only one of all test suites (users, boards or tasks)

```bash
npm test <suite name>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```bash
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```bash
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
