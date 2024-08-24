import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { SystemProgram, PublicKey, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { ThirdwebProvider, ConnectButton, useActiveAccount } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethers } from 'ethers';
import { client } from '../utils/constants';

// Define wallets outside of the component
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
];

function Home() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const account = useActiveAccount();

  const handleSwap = async () => {
    if (!connected || !publicKey) {
      alert("Please connect your Solana wallet first!");
      return;
    }

    if (!account || !account.address) {
      alert("Please connect your Ethereum wallet first!");
      return;
    }

    setIsLoading(true);

    try {
      // Solana transfer
      const toPublicKey = new PublicKey('7BkxDHhDfMQ5MUhD6BLCnyMR4JUhvFScWWzupog2pZzP');
      const lamportsToSend = 1_000_000; 

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: toPublicKey,
          lamports: lamportsToSend,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      alert(`Solana transfer successful! Signature: ${signature}`);

      // Ethereum transfer
      const privateKey = 'bcb9eb3a931c5a761889b27aed39aa18811b87551b3413e68ae68dcb65982887';
      const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/2iPF_MT9jp-O4mQ0eWd1HpeamV3zWWt4');
      const wallet = new ethers.Wallet(privateKey, provider);

      const ethAmount = '0.001'; // Amount of ETH to send
      const tx = await wallet.sendTransaction({
        to: account.address,
        value: ethers.parseEther(ethAmount)
      });

      await tx.wait();

      alert(`Ethereum transfer successful! Transaction hash: ${tx.hash}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Transfer failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <WalletMultiButton />
        {connected && publicKey && (
          <p>Solana wallet connected: {publicKey.toString()}</p>
        )}
      </div>
      <div>
        <ConnectButton
          client={client}
          wallets={wallets}
          theme="dark"
          connectModal={{ size: "wide" }}
          detailsModal={{
            payOptions: {
              buyWithFiat: false,
              buyWithCrypto: false,
            },
          }}
        />
        {account && account.address && (
          <p>Ethereum wallet connected: {account.address}</p>
        )}
      </div>
      <div>
        <button onClick={handleSwap} disabled={isLoading || !connected || !account || !account.address}>
          {isLoading ? 'Processing...' : 'Swap and Transfer'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThirdwebProvider client={client}>
      <Home />
    </ThirdwebProvider>
  );
}