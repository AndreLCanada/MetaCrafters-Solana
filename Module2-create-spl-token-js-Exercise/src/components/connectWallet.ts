  // @ts-ignore
export const connectWallet = async (setWalletKey) => {
  // @ts-ignore
  const { solana } = window;
  // checks if phantom wallet exists
  if (solana) {
    try {
      // connects wallet and returns response which includes the wallet public key
      const response = await solana.connect();
      console.log('Connected Wallet: ', response.publicKey.toString());
      // update walletKey to be the public key
      setWalletKey(response.publicKey.toString());
    } catch (err) {
      console.log(err);
      // { code: 4001, message: 'User rejected the request.' }
    }
  }
};
