import { useEffect, useState } from 'react';
import VaultDashboard from './components/VaultDashboard';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function App() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/ledger/total`);
        setTotal(res.data.total.toFixed(2));
      } catch (err) {
        console.error('❌ Failed to fetch total:', err.message);
      }
    };

    fetchTotal();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', backgroundColor: '#111', color: '#0f0' }}>
      <h1>👑 Kingdom Vault Dashboard</h1>
      <h2>💰 Total Deposits: ${total}</h2>
      <VaultDashboard />
    </div>
  );
}

export default App;
