import Web3 from 'web3'
import {
    web3loaded,
    web3AccountLoaded,
    web3ContractLoaded,
    setIsWhitelisted,
} from './actions'
import WalletConnectProvider from '@walletconnect/web3-provider'
import TurboRunners from '../../build/contracts/TurboRunners.json'

export const loadWeb3MetaMask = async (dispatch) => {
    let web3
    if (window.ethereum) {
        web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider)
    } else {
        throw 'No Metamask Detected'
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
    let web3 = new Web3(provider)
    dispatch(web3loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    const whitelist = process.env.NEXT_PUBLIC_WHITELIST.split(', ')
    dispatch(setIsWhitelisted(whitelist.includes(account)))
    dispatch(web3AccountLoaded(account))
    return account
}

export const loadContract = async (web3, dispatch) => {
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = TurboRunners.networks[networkId]
    const nft = new web3.eth.Contract(
        TurboRunners.abi,
        deployedNetwork && deployedNetwork.address
    )
    dispatch(web3ContractLoaded(nft))
    return nft
}
