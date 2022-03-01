import web3 from 'web3'
import BigNumber from 'bignumber.js'

const convertNumber = (value) => {
  return web3.utils.toHex(web3.utils.toWei(value, 'ether'))
}

export const _joinPool = async (busdContract, to, amount, account, chainId) => {
  if (chainId === 1) {
    const amountTemp = web3.utils.toWei(amount.toString(), 'picoether')
    const args = [to, amountTemp]
    const gas = await busdContract.estimateGas.transfer(...args)
    return busdContract.transfer(...args, { gasLimit: gas })
  }

  if (chainId === 137) {
    const amountTemp = web3.utils.toWei(amount.toString(), 'picoether')
    const args = [to, amountTemp]
    const gas = await busdContract.estimateGas.transfer(...args)
    return busdContract.transfer(...args, { gasLimit: gas })
  }

  const amountTemp = web3.utils.toWei(amount.toString(), 'ether')
  const args = [to, amountTemp]
  const gas = await busdContract.estimateGas.transfer(...args)
  return busdContract.transfer(...args, { gasLimit: gas })
}

export const _withDrawToken = async (poolContract, amount, account) => {
  return new Promise((resolve, reject) => {
    try {
      const amountTemp = new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()

      const args = [amountTemp]
      poolContract.methods
        .claim(...args)
        .estimateGas({ from: account }, function (error, result) {
          if (result) {
            poolContract.methods
              .claim(amountTemp)
              .send({ gas: result, from: account })
              .on('transactionHash', (tx) => {
                // console.log('tx>>>',tx)
                resolve(tx)
              })
              .catch((err) => {
                reject(err)
              })
          }
        })
        .catch((error) => {
          reject(error)
        })
    } catch (error) {
      reject(error)
    }
  })
}
export const _isClaim = async (poolContract, account) => {
  return poolContract.methods.users(account).call()
}
