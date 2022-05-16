const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config({ path: __dirname + '/.env.local' })

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1', // Localhost (default: none)
            port: 9545, // Standard Ethereum port (default: none)
            network_id: '*', // Any network (default: none)
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(
                    [process.env.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY],
                    `wss://rinkeby.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}` // URL to Ethereum Node
                )
            },
            network_id: 4,
        },
    },
    mocha: {
        // timeout: 100000
    },

    // Configure your compilers
    compilers: {
        solc: {
            version: '0.8.9',
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    plugins: ['truffle-plugin-verify'],

    api_keys: {
        etherscan: process.env.ETHERSCAN_API_KEY,
    },
}
