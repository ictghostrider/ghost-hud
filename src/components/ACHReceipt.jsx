// components/ACHReceipt.jsx
import React from 'react';

const ACHReceipt = ({ transfer }) => {
  if (!transfer) return <div>No transaction data.</div>;

  return (
    <div className="text-white bg-black p-6 rounded-lg shadow-lg border border-green-500">
      <h2 className="text-xl font-bold mb-2">✅ ACH Payment Sent</h2>
      <p><strong>Status:</strong> {transfer.status}</p>
      <p><strong>Amount:</strong> ${transfer.amount.value} {transfer.amount.currency}</p>
      <p><strong>Recipient ID:</strong> {transfer.targetAccount}</p>
      <p><strong>Quote ID:</strong> {transfer.quoteUuid}</p>
      <p><strong>Transfer ID:</strong> {transfer.id}</p>
    </div>
  );
};

export default ACHReceipt;
