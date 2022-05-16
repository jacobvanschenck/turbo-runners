const { expectRevert } = require('@openzeppelin/test-helpers')
const {
    getMerkleTree,
    getMerkleRoot,
    newMerkleTree,
} = require('../lib/merkleTreeHelpers')
const TurboRunners = artifacts.require('TurboRunners.sol')
const { calcDate } = require('../lib/calcDate')
require('dotenv').config({ path: __dirname + '/../.env.local' })

contract('TurboRunners - setRoot()', (accounts) => {
    const [owner, artist, minter, trader, nonWhitelistMinter, whitelistMinter] =
        [
            accounts[0],
            accounts[1],
            accounts[2],
            accounts[3],
            accounts[6],
            accounts[9],
        ]
    const amount = web3.utils.toWei('.01')
    const NFT_PUBLIC_MINT_DATE = calcDate(
        process.env.NEXT_PUBLIC_NFT_PUBLIC_MINT_DATE
    )
    const NFT_WHITELIST_MINT_DATE = calcDate(
        process.env.NEXT_PUBLIC_NFT_WHITELIST_MINT_DATE
    )
    const NFT_REVEAL_DATE = calcDate(process.env.NFT_REVEAL_DATE)

    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)

    const tree1 = getMerkleTree()
    const ROOT1 = '0x' + getMerkleRoot(tree1)
    const proof1 = [
        '0x71e0012ebbd5a1f5924aa40655bd9125f28d1d6e615a1ab0543d71c3f0164405',
    ]

    const tree2 = newMerkleTree([
        '0x7bC5EB15C94C41166ab12CE24Dab7E879c0A2B67',
        '0x470925Ba228D207D0f760c00310AeF5C0bEA7F9b',
        '0x2B602B851C5A337fb3cf451B2ec4e8433Da185B3',
        '0xb59c13A72c334d3d9794F6b676524c3f19f03c16',
    ])
    const ROOT2 = '0x' + getMerkleRoot(tree2)
    const proof2 = [
        '0xfbf2a4c8418ca0c072a186bb37ff291b40db5489d8c116aeb347854035025171',
        '0x56086dafc0f31ec4bcd1534df2b1f5e1c24d7160e33e8',
    ]

    it('should mint NFTs', async () => {
        let publicMintDate = Date.now().toString().slice(0, 10) + 86400
        let whitelistMintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            publicMintDate,
            whitelistMintDate,
            ROOT1,
            publicMintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await nft.mint(proof1, 1, { from: whitelistMinter, value: amount })
        let supplyAfter = await nft.totalSupply()
        assert(supplyAfter.toString() === '1')

        await nft.mint(proof1, 2, {
            from: whitelistMinter,
            value: amount * 2,
        })
        supplyAfter = await nft.totalSupply()
        assert(supplyAfter.toString() === '3')
    })

    it('should mint for whitelist address after root is updated', async () => {
        let publicMintDate = Date.now().toString().slice(0, 10) + 86400
        let whitelistMintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            publicMintDate,
            whitelistMintDate,
            ROOT1,
            publicMintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint(proof2, 1, { from: nonWhitelistMinter, value: amount }),
            'Address not on Whitelist'
        )
        await nft.setRoot(ROOT2)
        nft.mint(proof2, 1, { from: nonWhitelistMinter, value: amount })
    })
})
