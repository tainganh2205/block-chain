const switchNetwork = async (chainId) => {
  const provider: any = (window as Window).ethereum
  if (provider) {
    try {
      if (provider?.selectedAddress && chainId) {
        provider
          .request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId,
              },
            ],
          })
          .then(() => {
            // window.location.reload()
          })
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
  }
}

export default switchNetwork
