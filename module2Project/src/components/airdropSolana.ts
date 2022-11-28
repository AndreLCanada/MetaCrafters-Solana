const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

  const triggerAirdropFail = () => {
    alert("Uh no! The Faucet is empty right now. Try again in 30 seconds.")
  }

// @ts-ignore
  const airDropSol = async (setNewPair, newPair, setFillCheckMarkToggle) => {
    try {
      // Connect to the Devnet and make a wallet from privateKey
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      // Create the faucet key-pair and update the state variable with KeyPair object
      const faucetNewPair = Keypair.generate();
      setNewPair(faucetNewPair);
      // Extract the public key from the keypair
      const publicKey = new PublicKey(faucetNewPair.publicKey);
      console.log("New Solana Faucet publicKey: ", publicKey.toString())
      setTimeout(() => {}, 5000);
      // Request airdrop of 2 SOL to the faucet public address
      console.log('Airdropping some SOL into Solana Faucet!');
      const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(publicKey), 2 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(fromAirDropSignature);
      setTimeout(() => {}, 5000);
      // Check wallet balance of faucet
      const walletBalance = await connection.getBalance(
          new PublicKey(faucetNewPair.publicKey)
      );
      // console.log wallet balance and toggle "Faucet Filled & Ready" message in header
      console.log(publicKey.toString(), `Wallet balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
      setFillCheckMarkToggle(true);
    } catch (err) {
      //console.log error and very cringe-ily 'alert()' user to failure
      console.log(err);
      triggerAirdropFail();
    }
  };

export default airDropSol
