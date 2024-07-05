# Easy Install

One command to use the correct package manager to install dependencies for any project (based on the lock file that exists).

## Installation

```bash
npm i -g easy-install # creates a global `in` cli command
```

## Usage

Run the `in` command, optionally followed by dependencies you want to install.

```bash
in [flags] [...<pkg>]
```

```bash
Flags:
  -D, --dev Install pkg as a dev dependency
```

## Examples

### Install all project dependencies

```bash
in
# might run: npm install
# or: yarn install
# or: pnpm install
# or: bun install
```

### Add a project dependency

```bash
in express
# might run: npm install express
# or: yarn add express
# or: pnpm add express
# or: bun add express
```

### Add a project DEV dependency

```bash
in --dev nodemon
# might run: npm install --save-dev nodemon
# or: yarn add --dev nodemon
# or: pnpm add --save-dev nodemon
# or: bun add --dev nodemon
```

## Development

> You must have [Bun](https://bun.sh/docs/installation) installed globally.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run in
```

To build a binary:

```bash
bun run build
```
