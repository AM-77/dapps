# eth-vote

> A simple ethereum voting dapp with node.

## setup

first clone the repo:

```shell
git clone https://github.com/am-77/dapps.git
```

cd into the app folder:

```shell
cd dapps/eth-vote
```

then install the dependencies:

```shell
yarn
```

## run the app

run the local blockchain:

```shell
yarn run start
```

deploy the smart contract:

```shell
yarn run deploy
```
when it's deployed it's gonna return the smart contract address, use this address in the `vote.js` and `vote-count.js` files.

to vote run:

```shell
yarn run vote
```
to get the votes count  run:

```shell
yarn run vote-count
```


## NOTE 
I included the compiled smart contract files in the `distSol` folder for the sake of simplicity
you can remove it and recompile it, to do that run 

```shell
yarn run compile
```