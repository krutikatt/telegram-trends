import React, { useState } from 'react';
import { 
  createWalletClient, 
  createPublicClient, 
  createContractClient, 
  parseTon 
} from '@fotonjs/core';
import Contract from './contracts/Contract';

// Initialize clients
const publicClient = createPublicClient();
const walletClient = createWalletClient({
  manifestUrl: 'https://example.com/tonconnect-manifest.json',
});

const contractClient = createContractClient({
  contract: Contract,
  publicClient,
  walletClient,
  address: '0:123...def', // Replace with your contract's address
});

const ContractInteraction = () => {
  const [transactionHash, setTransactionHash] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWriteContract = async () => {
    try {
      setLoading(true);
      setError(null);
      setTransactionHash(null);

      const result = await contractClient.write({
        value: parseTon('0.05'), // Sending 0.05 TON with the transaction
        method: 'increment', // Replace with your contract method name
        payload: { queryId: 1n, amount: 1n }, // Replace with your payload
      });

      if (result.error) {
        throw new Error(result.error);
      }

      setTransactionHash(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Contract Interaction</h1>
      <button onClick={handleWriteContract} disabled={loading} style={{ padding: '10px 20px', fontSize: '16px' }}>
        {loading ? 'Processing...' : 'Write to Contract'}
      </button>
      {transactionHash && (
        <p style={{ color: 'green', marginTop: '10px' }}>
          Transaction Successful! Hash: {transactionHash}
        </p>
      )}
      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default ContractInteraction;
