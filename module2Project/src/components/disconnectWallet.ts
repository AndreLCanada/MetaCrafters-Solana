  // @ts-ignore
export const disconnectWallet = async (setWalletKey, walletKey) => {
  // @ts-ignore
  const { solana } = window;

  // checks if phantom wallet exists
  if (walletKey) {
    try {
      // disconnects wallet
      await solana.disconnect();
      console.log('disconnected');
      // update walletKey state variable to undefined
      setWalletKey(undefined);
    } catch (err) {
      console.log(err);
    // { code: 4001, message: 'User rejected the request.' }
    }
  }
};
