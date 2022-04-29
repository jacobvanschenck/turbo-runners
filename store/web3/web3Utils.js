import Web3 from 'web3'
import { web3loaded, web3AccountLoaded, web3ContractsLoaded } from './actions'
import WalletConnectProvider from '@walletconnect/web3-provider'

export const loadWeb3MetaMask = async (dispatch) => {
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

export const loadWeb3WalletConnect = async (dispatch) => {
    const provider = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    })
    try {
        await provider.enable()
    } catch (err) {
        console.log(err)
    }
    let web3 = await new Web3(provider)
    dispatch(web3loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    dispatch(web3AccountLoaded(account))
    return account
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
