import Web3 from 'web3'
import {
    web3loaded,
    web3AccountLoaded,
    web3ContractsLoaded,
} from './web3/actions'

export const loadWeb3 = async (dispatch) => {
    let web3
    if (window.ethereum) {
        web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
    } else {
    }
    dispatch(web3loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))
    return accounts[0]
}

export const loadContracts = async (web3, dispatch) => {
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = NFT.networks[networkId]
    const nft = new web3.eth.Contract(
        NFT.abi,
        deployedNetwork && deployedNetwork.address
    )
    deployedNetwork = NFTMarketplace.networks[networkId]
    const marketplace = new web3.eth.Contract(
        NFTMarketplace.abi,
        deployedNetwork && deployedNetwork.address
    )
    dispatch(web3ContractsLoaded({ nft, marketplace }))
    return { nft, marketplace }
}
