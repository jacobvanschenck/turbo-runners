const {
    newMerkleTree,
    getMerkleRoot,
    getMerkleProof,
    getMerkleLeaf,
} = require('./lib/merkleTreeHelpers')

function main() {
    const tree = newMerkleTree(process.env.WHITELIST.split(', '))
    const root = getMerkleRoot(tree)
    const leaf = getMerkleLeaf('0x2B602B851C5A337fb3cf451B2ec4e8433Da185B3')
    const proof = getMerkleProof(tree, leaf)

    console.log(
        `root: ${root}\nproof: ${proof.map(
            (item) => '0x' + item.data.toString('hex')
        )}\naddress: 0x2B602B851C5A337fb3cf451B2ec4e8433Da185B3\n`
    )

    console.log(tree.verify(proof, leaf, root))
}

main()
