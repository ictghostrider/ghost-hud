// File: PaymentEntryUI.jsx
import React, { useState } from 'react';

const PaymentEntryUI = () => {
  const [form, setForm] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    accountNumber: '',
    routingNumber: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (type) => {
    try {
      const endpoint = type === 'card' ? '/api/pay/card' : '/api/pay/ach';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      alert(`✅ Payment Sent: ${data.message || 'Success'}`);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded-xl shadow-lg space-y-4 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">💸 Live Payment Entry</h2>

      <div className="space-y-2">
        <input name="amount" placeholder="Amount $" value={form.amount} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <hr className="border-gray-700 my-2" />
        <input name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <input name="expDate" placeholder="Expiration (MM/YY)" value={form.expDate} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <input name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <button onClick={() => handleSubmit('card')} className="w-full bg-green-700 hover:bg-green-600 p-2 rounded">💳 Run Card</button>
      </div>

      <div className="space-y-2 border-t pt-4 border-gray-700">
        <input name="accountNumber" placeholder="Bank Account Number" value={form.accountNumber} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <input name="routingNumber" placeholder="Routing Number" value={form.routingNumber} onChange={handleChange} className="w-full p-2 bg-gray-900 text-white rounded" />
        <button onClick={() => handleSubmit('ach')} className="w-full bg-blue-700 hover:bg-blue-600 p-2 rounded">🏦 Run ACH</button>
      </div>
    </div>
  );
};

export default PaymentEntryUI;
