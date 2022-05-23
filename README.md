# Welcome to Turbo Runners

![Turbo Runners Screenshot](https://raw.githubusercontent.com/jacobvanschenck/nft-project-nextjs/master/GIFs/turborunners-screenshot.gif)

An full NFT project with the NFT contract and full minting site.

Here is the dApp running on the [Rinkeby Network](####)

## Features 📼

This project uses an implementation of the [ERC-721a](https://www.azuki.com/erc721a) standard from Azuki and includes:

-   Whitelisting
-   Royalties on mint and transfer
-   Art reveal date
-   Batch Minting

## Tech Stack ⚙️

![](https://img.shields.io/badge/-Next.js-000000?logo=nextdotjs&logoColor=white&style=flat)
![](https://img.shields.io/badge/-Solidity-363636?logo=solidity&logoColor=black&style=flat)
![](https://img.shields.io/badge/-TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat)

## Whitelisting 📋

![Whitelist Gif](https://raw.githubusercontent.com/jacobvanschenck/nft-project-nextjs/master/GIFs/whitelist.gif)

-   Smart Contract is created with a 'root' from a Merkle Tree
-   Front-End checks to see if address is on list
-   Front-End uses a Merkle Tree to create the 'proof' that is sent to mint funciton on Contract
-   Smart contract uses OpenZeppelin MerkleProof to verify the proof with the root.

## Install 💾

Start of by cloning this repo or downloading the zip file.
After that open up your terminal and run these commands:

```
cd ProjectFolder
npm install
```

### Run Truffle Blockchain 🔗

Next step is to get the Truffle blockchain running locally

```
cd ProjectFolder
truffle develop
```

Then inside of the `truffle(develop)` terminal run:

```
migrate --reset
```

### Start Client 🌐

Finally get the client site running on localhost.
Open a new Terminal window and run:

```
cd client/
npm run start
```

Head over to `http://localhost:3000` and start using MyDex!

> Note: Make sure to add the Ganache network to your Metamask

---

## Feedback 🤝

Do you have any suggestions for code or additional features you'd like to see implemented? Hit me up on [Twitter](https://twitter.com/JacobVanSchenck)
