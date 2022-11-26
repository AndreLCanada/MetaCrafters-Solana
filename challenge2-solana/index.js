// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
} = require('@solana/web3.js');

const DEMO_FROM_SECRET_KEY = new Uint8Array([
  input_secret_key_here
]);

var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
const to = Keypair.generate();

const getFromWalletBalance = async () => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWalletBalance = await connection.getBalance(from.publicKey);
    console.log(`From Wallet balance: ${fromWalletBalance / LAMPORTS_PER_SOL} SOL`);
    return fromWalletBalance;
  } catch (err) {
    console.log(err);
  }
};

const getToWalletBalance = async () => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const toWalletBalance = await connection.getBalance(to.publicKey);
    console.log(`To Wallet balance: ${toWalletBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
    console.log(err);
  }
};

const transferSol = async () => {
  // Send money from "from" wallet and into "to" wallet
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
  const fromWalletBalance = await connection.getBalance(from.publicKey);
  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: Math.round(Math.floor(fromWalletBalance) / 2),
    })
  );

  // Sign transaction
  var signature = await sendAndConfirmTransaction(connection, transaction, [from]);
  console.log('Signature is ', signature);
};

const mainFunction = async () => {
  await getFromWalletBalance();
  await getToWalletBalance();
  await transferSol();
  await getFromWalletBalance();
  await getToWalletBalance();
};

mainFunction();
