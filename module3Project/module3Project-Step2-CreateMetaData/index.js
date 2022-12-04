const mpl = require('@metaplex-foundation/mpl-token-metadata');
const web3 = require('@solana/web3.js');
const anchor = require('@project-serum/anchor'); 

function loadWalletKey(keypairFile) {
  const fs = require('fs');
  const loaded = web3.Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())));
  return loaded;
}

(async () => {
  const myKeypair = loadWalletKey('fromWallet.json'); 
  const mint = new web3.PublicKey('otrjeFd3z4YbsLWFqEj3Cye3AF5XBZWVtEUhMTMwieN'); 
  const tokenMetadataProgram = mpl.PROGRAM_ID;
  const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
  const seed2 = Buffer.from(tokenMetadataProgram.toBytes());
  const seed3 = Buffer.from(mint.toBytes());
  const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID)
  console.log(mint)
  const accounts = {
    metadata: metadataPDA,
    mint,
    mintAuthority: myKeypair.publicKey,
    payer: myKeypair.publicKey,
    updateAuthority: myKeypair.publicKey,
  }
  const DataV2 = {
    name: 'OTTR Token', 
    symbol: 'OTTR',
    uri: 'https://api.jsonbin.io/v3/qs/638bc3d87966e84526d367ac',
    sellerFeeBasisPoints: 250, // 2.5% seller fee
    creators: null,
    collection: null,
    uses: null
  };
  const args = {
    createMetadataAccountArgsV2: {
    data: DataV2,
    isMutable: true,
    }
  }
  const txInstruction = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
  const transaction = new web3.Transaction();
  transaction.add(txInstruction);
  const connection = new web3.Connection('https://api.devnet.solana.com');
  const confirmation = await web3.sendAndConfirmTransaction(connection, transaction, [myKeypair]);
  console.log(confirmation);
;})();