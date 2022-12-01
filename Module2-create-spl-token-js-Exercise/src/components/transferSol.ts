const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

// @ts-ignore
export const transferSolFromFaucet = async (newPair, walletKey)  => {
var from = newPair;
const to = walletKey;
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const getFromWalletBalance = async () => {
  try {
    // Get the balance of the 'from' wallet
    const fromWalletBalance = await connection.getBalance(from.publicKey);
    console.log(`From Wallet balance: ${fromWalletBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.log(err);
  }
};

const getToWalletBalance = async () => {
  try {
    // Get the balance of the 'to' wallet
    const toWalletBalance = await connection.getBalance(new PublicKey(to));
    console.log(`To Wallet balance: ${toWalletBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.log(err);
  }
};

const transferSol = async () => {
  // Send 1.99 SOL from the Faucet's balance to the connected wallet
  console.log('Attempting to transfer 1.99SOL to connected wallet');
  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: 1.99 * LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction
  var signature = await sendAndConfirmTransaction(connection, transaction, [from]);
  console.log('TRANSACTION SUCCESS: Signature is ', signature);
  alert(`TRANSACTION SUCCESS: ${signature}`);
};

const mainFunction = async () => {
  await getFromWalletBalance();
  await getToWalletBalance();
  await transferSol();
  await getFromWalletBalance();
  await getToWalletBalance();
};

mainFunction();
}