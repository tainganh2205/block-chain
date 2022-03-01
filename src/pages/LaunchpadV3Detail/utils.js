import web3 from 'web3'
import BigNumber from 'bignumber.js'

const convertNumber = (value) => {
  return web3.utils.toHex(web3.utils.toWei(value, 'ether'))
}

export const sleepSystem = (s) => {
  return new Promise(resolve => setTimeout(resolve, s));
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

export const _joinPoolNew = async (joinPoolContract, amount, projectId, signBusd, chainId) => {
  if (chainId === 1) {
    const amountTemp = web3.utils.toWei(amount.toString(), 'picoether')
    const args = [amountTemp, projectId, projectId, signBusd]
    const gas = await joinPoolContract.estimateGas.join(...args)
    return joinPoolContract.join(...args, { gasLimit: gas })
  }

  if (chainId === 137) {
    const amountTemp = web3.utils.toWei(amount.toString(), 'picoether')
    const args = [amountTemp, projectId, projectId, signBusd]
    const gas = await joinPoolContract.estimateGas.join(...args)
    return joinPoolContract.join(...args, { gasLimit: gas })
  }

  const amountTemp = web3.utils.toWei(amount.toString(), 'ether')
  const args = [amountTemp, projectId, projectId, signBusd]
  const gas = await joinPoolContract.estimateGas.join(...args)
  return joinPoolContract.join(...args)
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
  return poolContract && poolContract.methods.users(account).call()
}

export const _isClaimed = async (poolContract, account) => {
  return poolContract && poolContract.isClaimed(account)
}

export const _totalClaimed = async (poolContract, account) => {
  const res = poolContract && await poolContract.totalClaimed(account);
  return res / 1e18;
}

export const _isJoined = async (poolJoinContract, account, projectId, roundId) => {
  try {
    return poolJoinContract.isJoined(account, projectId, projectId)
  } catch (error) {
    return false
  }
}

export const _approveBUSD = async (contractBUSD, address, amount) => {
  const amountTemp = web3.utils.toWei(amount.toString());
  const result = await contractBUSD.approve(address, amountTemp)
  return result
}

export const _showClaimBtn = async (claimContract, account, amount) => {
  const amountTemp = web3.utils.toWei(amount.toString(), 'ether');
  const result = await claimContract.showClaimBtn(account, amountTemp)
  return result
}

export const _claimTokens = async (claimContract, item) => {
  const amountTemp = web3.utils.toWei(item.claimToken.toString(), 'ether');
  const args = [amountTemp, item.signToken]
  const gas = await claimContract.estimateGas.claimTokens(...args)
  return claimContract.claimTokens(...args, { gasLimit: gas })
}
export const _refund = async (claimContract, amountBusd, item) => {
  const amount = web3.utils.toWei(amountBusd.toString(), 'ether')
  const args = [amount, item.signBusd]
  const estimatedGas = await claimContract.estimateGas.refund(...args)
  return claimContract.refund(...args, {
    gasLimit: estimatedGas,
  })
}
export const _isRefundedRC = async (claimContract, account) => {
  return claimContract.userRefund(account.toLowerCase())
}