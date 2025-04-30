import React, { useState } from 'react';

const API_BASE = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://kingdom-backend.onrender.com";

const GhostChat = () => {
  const [messages, setMessages] = useState([
    { role: 'ghost', content: '👻 Ghost is live. Ask anything, Daddy J.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'you', content: input };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      // 🔁 Send to Ghost Chat API
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });

      const data = await res.json();
      const reply = data.reply || '❌ Ghost is silent.';
      setMessages(prev => [...prev, { role: 'ghost', content: reply }]);

      // 💰 Trigger real vault deposit (e.g. $5 per chat)
      await fetch(`${API_BASE}/api/vault/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 5.00 })
      });

    } catch (err) {
      setMessages(prev => [...prev, { role: 'ghost', content: '❌ Failed to speak or deposit.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-2">🧠 Ghost Chat</h2>
      <div className="h-40 overflow-y-auto space-y-2 mb-2 bg-gray-900 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
        ))}
      </div>
      <input
        className="w-full p-2 bg-gray-800 text-white mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
        placeholder="Ask Ghost anything..."
        disabled={loading}
      />
      <button
        className="w-full bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? '🔄 Summoning + Depositing...' : '🕊 Ask & Deposit'}
      </button>
    </div>
  );
};

export default GhostChat;

