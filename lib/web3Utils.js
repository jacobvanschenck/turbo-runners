import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export const connectWeb3 = () =>
    new Promise(async (resolve, reject) => {
        let provider = await detectEthereumProvider()
        if (provider) {
            await provider.request({ method: 'eth_requestAccounts' })
            try {
                const web3 = new Web3(window.ethereum)
                resolve(web3)
            } catch (error) {
                reject(error)
            }
        }
        reject('Install Metamask')
    })

export const loadAddress = async (web3) => {
    const accounts = await web3.eth.getAccounts()
    return accounts[0]
}
