const { expectRevert } = require('@openzeppelin/test-helpers')
const { getMerkleTree, getMerkleRoot } = require('../lib/merkleTreeHelpers')
const TurboRunners = artifacts.require('TurboRunners.sol')
require('dotenv').config({ path: __dirname + '/../.env.local' })

contract('TurboRunners - tokenURI()', (accounts) => {
    const [owner, artist, minter, trader, whitelistMinter] = [
        accounts[0],
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[9],
    ]
    const amount = web3.utils.toWei('.01')
    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)

    const tree = getMerkleTree()
    const ROOT = '0x' + getMerkleRoot(tree)
    const proof =
        '0x71e0012ebbd5a1f5924aa40655bd9125f28d1d6e615a1ab0543d71c3f0164405'

    it('should return URI for hidden.json before reveal date', async () => {
        let mintDate = Date.now().toString().slice(0, 10)
        let revealDate = Date.now().toString().slice(0, 10) + 600
        let hiddenURI = 'hidden.json'
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate - 1,
            mintDate - 1,
            ROOT,
            revealDate,
            process.env.BASE_URI,
            hiddenURI,
            process.env.ARTIST
        )
        await nft.mint([proof], 1, { from: minter, value: amount })
        let uri = await nft.tokenURI(0)
        assert(uri === hiddenURI)
    })

    it('should return URI for NFT after reveal date', async () => {
        let mintDate = Date.now().toString().slice(0, 10)
        let revealDate = Date.now().toString().slice(0, 10) - 60
        let tokenURI = 'uri'
        let hiddenURI = 'hidden.json'
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate - 1,
            mintDate - 1,
            ROOT,
            revealDate,
            tokenURI,
            hiddenURI,
            process.env.ARTIST
        )
        await nft.mint([proof], 1, { from: minter, value: amount })
        let uri = await nft.tokenURI(0)
        assert(uri === tokenURI + '0')
    })
})
