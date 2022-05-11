const TurboRunners = artifacts.require('TurboRunners')

module.exports = async function (deployer) {
    const NFT_MINT_DATE = new Date(process.env.NFT_MINT_DATE)
        .getTime()
        .toString()
        .slice(0, 10)

    const NFT_REVEAL_DATE = new Date(process.env.NFT_MINT_DATE)
        .getTime()
        .toString()
        .slice(0, 10)

    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)

    await deployer.deploy(
        TurboRunners,
        process.env.PROJECT_NAME,
        process.env.PROJECT_SYMBOL,
        MINT_RATE,
        process.env.MAX_SUPPLY,
        process.env.MAX_MINT,
        NFT_MINT_DATE,
        NFT_REVEAL_DATE,
        process.env.BASE_URI,
        process.env.HIDDEN_URI,
        process.env.ARTIST_ADDRESS,
        process.env.ROYALTY_FEE
    )
}
