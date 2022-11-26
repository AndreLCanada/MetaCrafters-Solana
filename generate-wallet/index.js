// Import Solana web3 functinalities
const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

// Create & log a new keypair
const newPair = Keypair.generate();
console.log(newPair);