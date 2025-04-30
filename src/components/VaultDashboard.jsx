import { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default function VaultDashboard() {
  const [ledger, setLedger] = useState([]);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/ledger/ledger`);
        setLedger(res.data.ledger || []);
      } catch (err) {
        console.error('❌ Failed to load ledger:', err.message);
      }
    };
    fetchLedger();
  }, []);

  return (
    <div>
      <h2>💾 Vault Ledger Entries</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Source</th>
            <th>Dest</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Logged At</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((entry, idx) => (
            <tr key={idx} style={{ borderTop: '1px solid #0f0' }}>
              <td>{entry.source_account || '--'}</td>
              <td>{entry.destination_account || '--'}</td>
              <td>{entry.amount}</td>
              <td>{entry.currency}</td>
              <td>{entry.logged_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
