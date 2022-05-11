const {
    getMerkleTree,
    getMerkleRoot,
    getMerkleProof,
    getMerkleLeaf,
} = require('./lib/merkleTreeHelpers')

function main() {
    const tree = getMerkleTree()
    const root = getMerkleRoot(tree)
    const leaf = getMerkleLeaf('0xb59c13A72c334d3d9794F6b676524c3f19f03c16')
    const proof = getMerkleProof(tree, leaf)

    console.log(
        `root: ${root}\nproof: ${proof.map(
            (item) => '0x' + item.data.toString('hex')
        )}\naddress: 0xb59c13A72c334d3d9794F6b676524c3f19f03c16\n`
    )

    console.log(tree.verify(proof, leaf, root))
}

main()
