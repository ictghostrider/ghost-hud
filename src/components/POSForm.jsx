// POSForm.jsx
import React, { useState } from 'react';

export default function POSForm() {
  const [card, setCard] = useState({ number: '', exp: '', cvv: '' });
  const [bank, setBank] = useState({ routing: '', account: '' });
  const [amount, setAmount] = useState('0.00');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    setStatus('💸 Sending...');
    try {
      const res = await fetch('/api/vault/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount), card, bank })
      });
      const data = await res.json();
      setStatus(data?.message || '✅ Success');
    } catch (e) {
      setStatus('❌ Error');
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded shadow">
      <h2 className="text-xl font-bold">💳 Ghost POS Terminal</h2>
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="Card Number" onChange={e => setCard({ ...card, number: e.target.value })} />
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="Exp (MM/YY)" onChange={e => setCard({ ...card, exp: e.target.value })} />
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="CVV" onChange={e => setCard({ ...card, cvv: e.target.value })} />
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="Routing Number" onChange={e => setBank({ ...bank, routing: e.target.value })} />
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="Account Number" onChange={e => setBank({ ...bank, account: e.target.value })} />
      <input className="w-full p-2 my-1 bg-gray-800 text-white" placeholder="Amount ($)" onChange={e => setAmount(e.target.value)} />
      <button className="bg-green-700 hover:bg-green-600 w-full p-2" onClick={handleSubmit}>💥 Pay Now</button>
      <div className="mt-2">{status}</div>
    </div>
  );
}
