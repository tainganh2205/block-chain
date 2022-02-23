export const _getReward = async (stakeContract,account,nftId,nftAddress) => {
  try {
    const args = [account,nftAddress,nftId]
    const result =  await stakeContract.pendingRewardByNftID(...args)
    return result
  } catch (error) {
    return error
  }
}
export const _havest = async (stakeContract,nftId,nftAddress) => {
  try {
    const args = [nftId,nftAddress,true]
    const gas = await stakeContract.estimateGas.withdraw(...args)
    const result =  await  stakeContract.withdraw(...args, { gasLimit: gas })
    return result
  } catch (error) {
    return error
  }

}
export const _stake = async (stakeContract, nftId,nftAddress) => {
  try {
    const args = [nftId, nftAddress]
    const gas = await stakeContract.estimateGas.deposit(...args)
    const result =  await stakeContract.deposit(...args, { gasLimit: gas })
    return result
  } catch (error) {
    return error
  }

}
export const _unStake = async (stakeContract, nftId,nftAddress) => {
  try {
    const args = [nftId,nftAddress,false]
    const gas = await stakeContract.estimateGas.withdraw(...args)
    const result =  await  stakeContract.withdraw(...args, { gasLimit: gas })
    return result
  } catch (error) {
    return error
  }

}