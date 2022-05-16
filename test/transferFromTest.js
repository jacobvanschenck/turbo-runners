const { expectRevert } = require('@openzeppelin/test-helpers')
const TurboRunners = artifacts.require('TurboRunners.sol')
const { getMerkleTree, getMerkleRoot } = require('../lib/merkleTreeHelpers')
require('dotenv').config({ path: __dirname + '/../.env.local' })

contract('TurboRunners - transferFrom()', (accounts) => {
    const [owner, artist, minter, trader, whitelistMinter] = [
        accounts[0],
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[9],
    ]
    let nft, time
    const amount = web3.utils.toWei('.01')
    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)
    const TRADE_RATE = web3.utils.toWei('1')
    const tree = getMerkleTree()
    const ROOT = '0x' + getMerkleRoot(tree)
    const proof =
        '0x71e0012ebbd5a1f5924aa40655bd9125f28d1d6e615a1ab0543d71c3f0164405'

    beforeEach(async () => {
        time = Date.now().toString().slice(0, 10)
        nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            time - 1,
            time - 1,
            ROOT,
            time - 1,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await nft.mint([proof], 1, { from: minter, value: amount })
    })

    it('should transfer NFTs', async () => {
        let nftOfMinter = await nft.balanceOf(minter)
        let nftOfTrader = await nft.balanceOf(trader)
        assert(nftOfMinter.toString() === '1')
        assert(nftOfTrader.toString() === '0')
        await nft.approve(trader, 0, { from: minter })
        await nft.transferFrom(minter, trader, 0, {
            from: trader,
            value: TRADE_RATE,
        })
        let nftBalanceAfterMinter = await nft.balanceOf(minter)
        let nftBalanceAfterTrader = await nft.balanceOf(trader)
        assert(nftBalanceAfterMinter.toString() === '0')
        assert(nftBalanceAfterTrader.toString() === '1')
    })

    it('should send royalty to artist and remaing value to "from" address', async () => {
        await nft.approve(trader, 0, { from: minter })
        let balanceBeforeMinter = await web3.eth.getBalance(minter)
        let balanceBeforeArtist = await web3.eth.getBalance(artist)
        await nft.transferFrom(minter, trader, 0, {
            from: trader,
            value: TRADE_RATE,
        })
        let balanceAfterMinter = await web3.eth.getBalance(minter)
        let balanceAfterArtist = await web3.eth.getBalance(artist)
        let royalty = (TRADE_RATE * 5) / 100
        let remaining = TRADE_RATE - royalty
        let diffMinter = balanceAfterMinter - balanceBeforeMinter
        let diffArtist = balanceAfterArtist - balanceBeforeArtist
        assert(diffMinter === remaining)
        assert(diffArtist === royalty)
    })
})
