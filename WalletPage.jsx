import React from "react";
import "./WalletPage.css"; // Optional: For custom styling

const WalletPage = () => {
  return (
    <div className="wallet-page">
      <h2>Wallet</h2>
      <p>Connect your TON wallet for future rewards</p>
      <button className="connect-wallet-button">
        <span className="wallet-icon">🔗</span> Connect your TON wallet
      </button>
    </div>
  );
};

export default WalletPage;