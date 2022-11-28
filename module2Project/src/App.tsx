
// importfunctionalities
import {useEffect , useState } from "react";
import './styles-css/globals.css';
import {
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import airDropSol from './components/airdropSolana';
import { connectWallet  } from './components/connectWallet';
import { disconnectWallet } from './components/disconnectWallet';
import { transferSolFromFaucet } from './components/transferSol';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Fade } from '@mui/material';

window.Buffer = window.Buffer || require("buffer").Buffer;

// create types
type DisplayEncoding = "utf8" | "hex";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect" 
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

// create a provider interface (hint: think of this as an object) to store the Phantom Provider
interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

/**
 * @description gets Phantom provider, if it exists
 */
 const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    // @ts-ignore
    const provider = window.solana as any;
    if (provider.isPhantom) return provider as PhantomProvider;
  }
};

function App() {
  // create state variable for the provider
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );

	// create state variable for the wallet key
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
  undefined
  );

  // create state variable for the faucet key-pair
  const [newPair, setNewPair] = useState<PhantomProvider | undefined>(
    undefined
    );

    // create state variable for the fillCheckMarkToggle
  const [fillCheckMarkToggle, setFillCheckMarkToggle] = useState<PhantomProvider | boolean>(
    false
    );
  
  // this is the function that runs whenever the component updates (e.g. render, refresh)
  useEffect(() => {
	  const provider = getProvider();

		// if the phantom provider exists, set this as the provider
	  if (provider) setProvider(provider);
	  else setProvider(undefined);
  }, []);
 
  const handleConnectWalletClick = () => {
    connectWallet(setWalletKey)
  };

  const handleDisconnectWalletClick = () => {
    disconnectWallet(setWalletKey, walletKey)
  };

  const handleAirDropSolClick = () => {
    airDropSol(setNewPair, newPair, setFillCheckMarkToggle)
  };

  const handleTransferSolClick = () => {
  transferSolFromFaucet(newPair, walletKey)
  };
	// HTML code for the app
  return (
    <>
    <Fade in={true} style={{ transitionDelay: `500ms` }} timeout={{ enter: 800 }}>
    <div className="App">
      <header className="App-header">
        <div className={'titleContainer'}>
        <h1>Solana Faucet</h1>
        </div>
        {provider && walletKey && <p className={'walletConnected'}>
          <CheckCircleOutlineIcon 
          sx={{
            fontSize: "34px",
            transform: "translateY(6px)",
            fill: 'green',
            marginRight: 1,
          }}/>
          Wallet Connected
          </p>}
          {fillCheckMarkToggle && <p className={'faucetFilled'}>
          <CheckCircleOutlineIcon 
          sx={{
            fontSize: "34px",
            transform: "translateY(6px)",
            fill: 'green',
            marginRight: 1,
          }}/>
          Faucet Filled & Ready
          </p>}
      </header>
        <div className={'card'}>
          <div className={'instructionCard'}>
            <div className={'instructions'}>
              <h2>Create a new faucet key-pair and aidrop 2 SOL</h2>
            </div>
            <button
                style={{
                  fontSize: "16px",
                  padding: "20px",
                  fontWeight: "bold",
                }}
                onClick={handleAirDropSolClick}
                >
                Fill Faucet
              </button>
            </div> 
          <div className={'instructionCard'}>
          <div className={'instructions'}>
              <h2>Connect your Phantom Wallet to the faucet</h2>
            </div>
            {(!provider && (
          <p className={'noWalletFound'}>
            No Wallet Found: Install{" "}
            <a href="https://phantom.app/">Phantom Browser extension</a>
          </p>
        )) || (provider && !walletKey && (
          <button
            style={{
              fontSize: "16px",
              padding: "10px",
              fontWeight: "bold",
              
            }}
            onClick={handleConnectWalletClick}
            >
            Connect Wallet
          </button>
            )) || (provider && walletKey && (
              <button
                style={{
                  fontSize: "16px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
                onClick={handleDisconnectWalletClick}
              >
                Disconnect Wallet
              </button>
            ))}
          </div> 
          <div className={'instructionCard'}>
          <div className={'instructions'}>
              <h2>Empty the faucet into the connected wallet</h2>
            </div>
            <button
                style={{
                  fontSize: "16px",
                  padding: "20px",
                  fontWeight: "bold",
                }}
                onClick={handleTransferSolClick}
                >
                Use Faucet
              </button>
          </div>
        </div>
    </div>
    </Fade>
    </>
  );
}

export default App;
