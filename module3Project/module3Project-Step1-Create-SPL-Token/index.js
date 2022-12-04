import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';

(async () => {
    // Connect to cluster, generate a new Keypair, and log fromWallet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate();
    console.log(fromWallet);

    // Airdrop the fromWallet SOL to pay for following txs
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);

    // Wait for airdrop confirmation
    const confirm = await connection.confirmTransaction(fromAirdropSignature, { commitment: "confirmed" });
    console.log('Airdrop confirmed: ',confirm);
    // Create mint's keypair from secret key generated in CLI
    const SECRET_KEY = new Uint8Array([199,56,70,128,107,133,101,187,235,132,229,243,46,248,161,53,65,129,242,85,211,206,5,44,237,128,128,193,228,30,118,221,12,3,90,73,123,165,123,100,193,86,233,26,2,70,109,197,136,152,235,50,140,188,187,46,204,22,196,127,32,43,9,43]);
    const mintKeypair = Keypair.fromSecretKey(SECRET_KEY);
    console.log(mintKeypair)
    // Create Mint and log
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9, mintKeypair);
    
    console.log(mint);

    // Create fromWallet token account
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    //Mint 10000 new tokens to the fromWallet and log sig
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        10000000000000,
        []
    );
    console.log('mint tx:', signature)
})();