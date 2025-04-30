import React, { useEffect, useState } from 'react';

const VaultStatus = () => {
  const [vault, setVault] = useState(null);

  const fetchVault = async () => {
    const res = await fetch('/api/vault/status');
    const data = await res.json();
    setVault(data);
  };

  useEffect(() => {
    fetchVault();
    const interval = setInterval(fetchVault, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!vault) return <p>Loading vault data...</p>;

  return (
    <div className="bg-purple-900 text-white p-4 rounded-xl mt-4 shadow-md">
      <h2 className="text-lg font-bold mb-2">🧿 Ghost Vault</h2>
      <p>💰 Balance: ${vault.balance.toFixed(2)} {vault.currency}</p>
      <p>📥 Last Deposit: {new Date(vault.lastDeposit).toLocaleString()}</p>
    </div>
  );
};

export default VaultStatus;
