export const WEB3_CONNECTION_LOADED = 'WEB3_CONNECTION_LOADED'
export function web3loaded(connection) {
    return {
        type: WEB3_CONNECTION_LOADED,
        connection: connection,
    }
}

export const WEB3_ACCOUNT_LOADED = 'WEB3_ACCOUNT_LOADED'
export function web3AccountLoaded(account) {
    return {
        type: WEB3_ACCOUNT_LOADED,
        account: account,
    }
}

export const WEB3_CONTRACT_LOADED = 'WEB3_CONTRACT_LOADED'
export function web3ContractLoaded(contract) {
    return {
        type: WEB3_CONTRACT_LOADED,
        contract: contract,
    }
}

export const PUBLIC_MINT_DATE_SET = 'PUBLIC_MINT_DATE_SET'
export function publicMintDateSet(publicMintDate) {
    return {
        type: PUBLIC_MINT_DATE_SET,
        publicMintDate,
    }
}

export const WHITELIST_MINT_DATE_SET = 'WHITELIST_MINT_DATE_SET'
export function whitelistMintDateSet(whitelistMintDate) {
    return {
        type: WHITELIST_MINT_DATE_SET,
        whitelistMintDate,
    }
}

export const IS_WHITELISTED = 'IS_WHITELISTED'
export function setIsWhitelisted(isWhitelisted) {
    return {
        type: IS_WHITELISTED,
        isWhitelisted,
    }
}
