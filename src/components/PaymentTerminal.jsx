// 📁 frontend_hud/components/PaymentTerminal.jsx
import React, { useState } from 'react';

export default function PaymentTerminal() {
  const [form, setForm] = useState({ card: '', exp: '', cvv: '', routing: '', account: '', amount: '' });
  const [status, setStatus] = useState('');

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const pay = async () => {
    setStatus('Processing...');
    try {
      const res = await fetch('https://kingdom-backend.onrender.com/api/vault/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      setStatus(json.success ? '✅ Payment received' : '❌ Failed: ' + json.error);
    } catch (err) {
      setStatus('❌ System error');
    }
  };

  return (
    <div className="bg-black text-green-400 p-6 rounded-xl shadow-xl space-y-2">
      <h2 className="text-xl font-bold">💳 Ghost Payment Terminal</h2>
      <input className="w-full bg-gray-800 p-2" name="amount" placeholder="Amount $" onChange={update} />
      <input className="w-full bg-gray-800 p-2" name="card" placeholder="Card Number" onChange={update} />
      <input className="w-full bg-gray-800 p-2" name="exp" placeholder="Exp Date (MM/YY)" onChange={update} />
      <input className="w-full bg-gray-800 p-2" name="cvv" placeholder="CVV" onChange={update} />
      <input className="w-full bg-gray-800 p-2" name="routing" placeholder="Routing #" onChange={update} />
      <input className="w-full bg-gray-800 p-2" name="account" placeholder="Account #" onChange={update} />
      <button className="w-full bg-green-600 hover:bg-green-500 py-2 rounded" onClick={pay}>🔥 Send Payment</button>
      <p className="text-white">{status}</p>
    </div>
  );
}
