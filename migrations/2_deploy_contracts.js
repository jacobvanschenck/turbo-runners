const TurboRunners = artifacts.require('TurboRunners')
const { getMerkleTree, getMerkleRoot } = require('../lib/merkleTreeHelpers')

module.exports = async function (deployer) {
    const NFT_PUBLIC_MINT_DATE = new Date(process.env.NFT_PUBLIC_MINT_DATE)
        .getTime()
        .toString()
        .slice(0, 10)

    const NFT_WHITELIST_MINT_DATE = new Date(
        process.env.NFT_WHITELIST_MINT_DATE
    )
        .getTime()
        .toString()
        .slice(0, 10)

    const NFT_REVEAL_DATE = new Date(process.env.NFT_REVEAL_DATE)
        .getTime()
        .toString()
        .slice(0, 10)

    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)

    const tree = getMerkleTree()
    const ROOT = '0x' + getMerkleRoot(tree)

    await deployer.deploy(
        TurboRunners,
        MINT_RATE,
        process.env.MAX_SUPPLY,
        process.env.MAX_MINT,
        process.env.MAX_MINT_PER_TRANSACTION,
        NFT_PUBLIC_MINT_DATE,
        NFT_WHITELIST_MINT_DATE,
        ROOT,
        NFT_REVEAL_DATE,
        process.env.BASE_URI,
        process.env.HIDDEN_URI,
        process.env.ARTIST
    )
}
