import React, { useState } from 'react';

const GhostTerminal = () => {
  const [card, setCard] = useState({ number: '', exp: '', cvv: '' });
  const [bank, setBank] = useState({ account: '', routing: '' });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleACH = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('https://kingdom-backend.onrender.com/api/ach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: bank.account, routing: bank.routing, amount })
      });
      const data = await res.json();
      setResult(`✅ ACH Deposit Success: ${JSON.stringify(data)}`);
    } catch (err) {
      setResult('❌ ACH Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCard = async () => {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('https://kingdom-backend.onrender.com/api/card/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: card.number, exp: card.exp, cvv: card.cvv, amount })
      });
      const data = await res.json();
      setResult(`✅ Card Charged: ${JSON.stringify(data)}`);
    } catch (err) {
      setResult('❌ Card Charge Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded-xl shadow-xl w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧾 Ghost POS Terminal</h2>

      <input
        type="text"
        className="w-full p-2 mb-2 bg-gray-800 text-white"
        placeholder="💵 Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-bold">🏦 ACH Payment</h3>
          <input className="w-full p-2 mb-2 bg-gray-800 text-white" placeholder="Account #" value={bank.account} onChange={e => setBank({ ...bank, account: e.target.value })} />
          <input className="w-full p-2 mb-2 bg-gray-800 text-white" placeholder="Routing #" value={bank.routing} onChange={e => setBank({ ...bank, routing: e.target.value })} />
          <button className="w-full bg-green-700 p-2 rounded" onClick={handleACH} disabled={loading}>🔁 ACH Deposit</button>
        </div>

        <div>
          <h3 className="font-bold">💳 Credit Card</h3>
          <input className="w-full p-2 mb-2 bg-gray-800 text-white" placeholder="Card #" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
          <input className="w-full p-2 mb-2 bg-gray-800 text-white" placeholder="MM/YY" value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} />
          <input className="w-full p-2 mb-2 bg-gray-800 text-white" placeholder="CVV" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
          <button className="w-full bg-green-700 p-2 rounded" onClick={handleCard} disabled={loading}>💸 Charge Card</button>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-3 rounded mt-4">
        {loading ? '⏳ Processing...' : result}
      </div>
    </div>
  );
};

export default GhostTerminal;
