import web3 from 'web3'
import BigNumber from 'bignumber.js'
import { ADDRESS_ADMIN_BSCS, MINT_PRICE } from '../../constants'

//
export const _getMaxTokenId = (nftContract) => {
  return nftContract.nextTokenId()
}

const convertNumber = (value) => {
  return web3.utils.toHex(web3.utils.toWei(value, 'ether'))
}
export const _transferBSCS = async (contract, account, amount) => {
  const amountTemp = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
  const args = [ADDRESS_ADMIN_BSCS, amountTemp]
  const gas = await contract.estimateGas.transfer(...args)
  return contract.transfer(ADDRESS_ADMIN_BSCS, amountTemp, { from: account, gasLimit: gas })
}

export const _transferNFT = async (nftContract, account, to, tokenId) => {
  const args = [account, to, tokenId]
  const estimatedGas = await nftContract.estimateGas.transferFrom(...args)
  return nftContract.transferFrom(...args, {
    gasLimit: estimatedGas,
  })
}

export const _cancelTokenTo = async (bidContract, tokenId) => {
  const args = [tokenId]
  const estimatedGas = await bidContract.estimateGas.cancelSellToken(tokenId)
  return bidContract.cancelSellToken(...args, {
    gasLimit: estimatedGas, // exe
  })
}

export const _sellTokenTo = async (bidContract, tokenId, address) => {
  const args = [tokenId, address]
  const estimatedGas = await bidContract.estimateGas.sellTokenTo(tokenId, address)
  return bidContract.sellTokenTo(...args, {
    gasLimit: estimatedGas, //
  })
}
export const _cancelBidToken = async (bidContract, tokenId) => {
  const args = [tokenId]
  const estimatedGas = await bidContract.estimateGas.cancelBidToken(tokenId)
  return bidContract.cancelBidToken(...args, {
    gasLimit: estimatedGas,
  })
}

export const _getBids = async (bidContract, tokenId) => {
  return new Promise((resolve, reject) => {
    const args = [tokenId]
    bidContract
      .getBids(...args, {
        gasLimit: 200000,
      })
      .then((response) => {
        console.log('response>>', response)
        resolve(response)
      })
      .catch((error) => {
        console.log('response>>')
        reject(error)
      })
  })
}

export const _getAsks = (bidContract, account) => {
  const args = [account]
  return bidContract.getAsksByUser(...args)
}

export const _buyToken = async (bidContract, tokenId) => {
  const args = [tokenId]
  const estimatedGas = await bidContract.estimateGas.buyToken(...args)
  return bidContract.buyToken(...args, {
    gasLimit: estimatedGas,
  })
}

const _updateBidToken = async (bidContract, tokenId, price) => {
  return new Promise((resolve, reject) => {
    const args = [tokenId, convertNumber(price)]
    bidContract
      .updateBidPrice(...args, {
        gasLimit: 2000000,
      })
      .then((response) => {
        console.log('response>>', response)
        resolve(response)
      })
      .catch((error) => {
        console.log('response>>')
        reject(error)
      })
  })
}

export const _getOwnerToken = async (nftContract, account) => {
  return nftContract.ownerOf(account)
}

export const _bidToken = async (bidContract, tokenId, price) => {
  const args = [tokenId, convertNumber(price)]
  const estimatedGas = await bidContract.estimateGas.bidToken(...args)
  return bidContract.bidToken(...args, {
    gasLimit: estimatedGas,
  })
}

export const _setCurrentPrice = async (bidContract, tokenId, price) => {
  const args = [tokenId, convertNumber(price)]
  const estimatedGas = await bidContract.estimateGas.setCurrentPrice(...args)
  return bidContract.setCurrentPrice(...args, {
    gasLimit: estimatedGas,
  })
}

export const _readyToSellToken = async (bidContract, tokenId, price) => {
  const args = [tokenId, convertNumber(price)]
  const estimatedGas = await bidContract.estimateGas.readyToSellToken(...args)
  return bidContract.readyToSellToken(...args, {
    gasLimit: estimatedGas,
  })
}

const _mintToken = async (nftContract, account, url) => {
  const args = [account, url]
  // const estimatedGas = await nftContract.estimateGas.mint(...[account, url], { from: account, value: MINT_PRICE })
  return nftContract.mint(...args, {
    gasLimit: 850000,
    value: MINT_PRICE,
  })
}
export default _mintToken
