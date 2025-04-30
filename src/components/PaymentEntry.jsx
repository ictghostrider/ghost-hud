import React, { useState } from 'react';

const API_BASE = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://kingdom-backend.onrender.com";

const PaymentEntry = () => {
  const [ach, setAch] = useState({ account: '', routing: '', amount: '' });
  const [card, setCard] = useState({ number: '', exp: '', cvv: '', amount: '' });
  const [status, setStatus] = useState('');

  const handleACH = async () => {
    setStatus('⏳ Sending ACH...');
    try {
      const res = await fetch(`${API_BASE}/api/ach/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ach)
      });
      const data = await res.json();
      setStatus(`✅ ACH: ${data.message || 'Success'}`);
    } catch (err) {
      setStatus('❌ ACH Failed');
    }
  };

  const handleCard = async () => {
    setStatus('⏳ Charging card...');
    try {
      const res = await fetch(`${API_BASE}/api/card/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
      });
      const data = await res.json();
      setStatus(`✅ Card: ${data.message || 'Charged'}`);
    } catch (err) {
      setStatus('❌ Card Failed');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md space-y-6 mt-6">
      <h2 className="text-2xl font-bold text-green-400">💰 Ghost Terminal</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ACH Section */}
        <div className="space-y-2 bg-black p-4 rounded-lg border border-green-700">
          <h3 className="text-lg font-semibold text-green-300">🏦 ACH Transfer</h3>
          <input type="text" placeholder="Account Number" value={ach.account}
            onChange={e => setAch({ ...ach, account: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <input type="text" placeholder="Routing Number" value={ach.routing}
            onChange={e => setAch({ ...ach, routing: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <input type="number" placeholder="Amount (USD)" value={ach.amount}
            onChange={e => setAch({ ...ach, amount: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <button onClick={handleACH} className="w-full bg-green-600 hover:bg-green-500 py-2 rounded">💸 Send ACH</button>
        </div>

        {/* Card Section */}
        <div className="space-y-2 bg-black p-4 rounded-lg border border-green-700">
          <h3 className="text-lg font-semibold text-green-300">💳 Credit Card</h3>
          <input type="text" placeholder="Card Number" value={card.number}
            onChange={e => setCard({ ...card, number: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <input type="text" placeholder="Expiration (MM/YY)" value={card.exp}
            onChange={e => setCard({ ...card, exp: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <input type="text" placeholder="CVV" value={card.cvv}
            onChange={e => setCard({ ...card, cvv: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <input type="number" placeholder="Amount (USD)" value={card.amount}
            onChange={e => setCard({ ...card, amount: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded" />
          <button onClick={handleCard} className="w-full bg-green-600 hover:bg-green-500 py-2 rounded">💳 Run Card</button>
        </div>
      </div>

      {/* Status */}
      <div className="text-yellow-300 font-mono text-center mt-4">{status}</div>
    </div>
  );
};

export default PaymentEntry;
