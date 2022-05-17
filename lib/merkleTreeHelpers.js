const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')
//require('dotenv').config({ path: __dirname + '/../.env.local' })

function getMerkleTree() {
    const addresses = process.env.NEXT_PUBLIC_WHITELIST.split(', ')
    const leaves = addresses.map((item) => keccak256(item))
    return new MerkleTree(leaves, keccak256, { sortPairs: true })
}

function newMerkleTree(addresses) {
    const leaves = addresses.map((item) => keccak256(item))
    return new MerkleTree(leaves, keccak256, { sortPairs: true })
}

function getMerkleRoot(tree) {
    return tree.getRoot().toString('hex')
}

function getMerkleLeaf(address) {
    return keccak256(address)
}

function getMerkleProof(tree, leaf) {
    return tree.getProof(leaf)
}

const buf2Hex = (item) => item.toString('hex')

module.exports = {
    getMerkleTree,
    getMerkleRoot,
    getMerkleProof,
    getMerkleLeaf,
    newMerkleTree,
}
