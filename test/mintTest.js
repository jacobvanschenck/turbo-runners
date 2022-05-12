const { expectRevert } = require('@openzeppelin/test-helpers')
const { getMerkleTree, getMerkleRoot } = require('../lib/merkleTreeHelpers')
const TurboRunners = artifacts.require('TurboRunners.sol')
const { calcDate } = require('../lib/calcDate')

contract('TurboRunners - mint()', (accounts) => {
    const [owner, artist, minter, trader, whitelistMinter] = [
        accounts[0],
        accounts[1],
        accounts[2],
        accounts[3],
        accounts[9],
    ]
    const amount = web3.utils.toWei('.01')
    const NFT_PUBLIC_MINT_DATE = calcDate(process.env.NFT_PUBLIC_MINT_DATE)
    const NFT_WHITELIST_MINT_DATE = calcDate(
        process.env.NFT_WHITELIST_MINT_DATE
    )
    const NFT_REVEAL_DATE = calcDate(process.env.NFT_REVEAL_DATE)

    const MINT_RATE = web3.utils.toWei(process.env.MINT_RATE)

    const tree = getMerkleTree()
    const ROOT = '0x' + getMerkleRoot(tree)
    const proof =
        '0x71e0012ebbd5a1f5924aa40655bd9125f28d1d6e615a1ab0543d71c3f0164405'
    const badProof =
        '0x71e0012ebbd5a1f5924aa40655bd9125f28d1d6e615a1ab0543d71c3f0164404'

    it('should mint NFTs', async () => {
        let time = Date.now().toString().slice(0, 10)
        let nft = await TurboRunners.new(
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
        let supplyAfter = await nft.totalSupply()
        assert(supplyAfter.toString() === '1')

        await nft.mint([proof], 2, { from: minter, value: amount * 2 })
        supplyAfter = await nft.totalSupply()
        assert(supplyAfter.toString() === '3')
    })

    it('should NOT mint before whitelist mint date', async () => {
        let mintDate = Date.now().toString().slice(0, 10) + 600 //one mintue after deployment
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint([proof], 1, { from: minter, value: amount }),
            'Minting not allowed yet'
        )
    })

    it('should mint for whitelisted address before public mint date', async () => {
        let publicMintDate = Date.now().toString().slice(0, 10) + 600
        let whitelistMintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            publicMintDate,
            whitelistMintDate,
            ROOT,
            publicMintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await nft.mint([proof], 1, { from: whitelistMinter, value: amount })
        const balance = await nft.balanceOf(whitelistMinter)
        assert(balance.toString() === '1')
    })

    it('should NOT mint for whitelisted address with INCORRECT proof', async () => {
        let publicMintDate = Date.now().toString().slice(0, 10) + 600
        let whitelistMintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            publicMintDate,
            whitelistMintDate,
            ROOT,
            publicMintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint([badProof], 1, { from: whitelistMinter, value: amount }),
            'Address not on Whitelist'
        )
    })

    it('should NOT mint for non-whitelisted address before public mint date', async () => {
        let publicMintDate = Date.now().toString().slice(0, 10) + 600
        let whitelistMintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            publicMintDate,
            whitelistMintDate,
            ROOT,
            publicMintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint([proof], 1, { from: minter, value: amount }),
            'Address not on Whitelist'
        )
    })

    it('should NOT mint if isPaused', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await nft.setIsPaused(true)
        await expectRevert(
            nft.mint([proof], 1, { from: minter, value: amount }),
            'Minting is currently paused'
        )
    })

    it('should NOT mint more than MAX_MINT', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        nft.mint([proof], 3, { from: minter, value: amount * 3 })
        await expectRevert(
            nft.mint([proof], 3, { from: minter, value: amount * 3 }),
            'Exceeded the max limit per address'
        )
    })

    it('should NOT mint more than the MAX_SUPPLY', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await nft.mint([proof], 3, { from: minter, value: amount * 3 })
        await nft.mint([proof], 2, { from: minter, value: amount * 2 })
        await nft.mint([proof], 3, { from: trader, value: amount * 3 })
        await nft.mint([proof], 2, { from: trader, value: amount * 2 })
        await expectRevert(
            nft.mint([proof], 1, { from: whitelistMinter, value: amount }),
            'Not enough tokens left'
        )
    })

    it('should NOT mint more than the MAX_MINT_PER_TRANSACTION', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint([proof], 4, { from: minter, value: amount * 4 }),
            'Max mint per transaction exceeded'
        )
    })

    it('should NOT mint with incorrect ether sent', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        await expectRevert(
            nft.mint([proof], 1, {
                from: minter,
                value: web3.utils.toWei('0.009'),
            }),
            'Not enough ether sent'
        )
    })

    it('should pay royalty to artist address on mint', async () => {
        let mintDate = Date.now().toString().slice(0, 10) - 1
        let nft = await TurboRunners.new(
            MINT_RATE,
            process.env.MAX_SUPPLY,
            process.env.MAX_MINT,
            process.env.MAX_MINT_PER_TRANSACTION,
            mintDate,
            mintDate,
            ROOT,
            mintDate,
            process.env.BASE_URI,
            process.env.HIDDEN_URI,
            process.env.ARTIST
        )
        let artistBalanceBefore = await web3.eth.getBalance(artist)
        let ownerBalanceBefore = await web3.eth.getBalance(owner)
        await nft.mint([proof], 1, { from: minter, value: amount })
        let artistBalanceAfter = await web3.eth.getBalance(artist)
        let ownerBalanceAfter = await web3.eth.getBalance(owner)
        let artistDiff = artistBalanceAfter - artistBalanceBefore
        let ownerDiff = ownerBalanceAfter - ownerBalanceBefore
        let royalty = (amount * 5) / 100
        assert(artistDiff === royalty)
        assert(ownerDiff === amount - royalty)
    })
})
