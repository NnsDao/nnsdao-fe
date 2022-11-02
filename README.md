# FE-template-react

> It is a simple starter template build on Internet Computer

## Installation

Fork or Clone this repo and install all dependencies

```sh
nvm use && npm ci
```

## Development

`npm run dev`

## Build

`npm run build`

## Deploy

```bash
zsh script/deploy.sh  # online

zsh script/deploy.sh test  # test canister
```

## Command

```bash
dfx deploy --no-wallet --network ic

dfx identity get-principal

dfx canister --network ic start assets

dfx canister --network ic install assets -m reinstall
```

Refer

- [Installing the DFX SDK](https://smartcontracts.org/docs/current/developer-docs/build/install-upgrade-remove)
- [Plug](https://docs.plugwallet.ooo/getting-started/extension-components/)
- [Stoic](https://www.npmjs.com/package/ic-stoic-identity)
