  const express = require('express');
  const router = express.Router();
  const VaultAccess = ({ onAccessGranted }) => {
  const [pin, setPin] = useState('');
  const [trigger, setTrigger] = useState('');
  const correctPin = '2022';
  const triggerWord = 'Ghost';

  const handleAccess = () => {
    if (pin === correctPin && trigger.toLowerCase() === triggerWord.toLowerCase()) {
      onAccessGranted();
    } else {
      alert("Access Denied: Incorrect PIN or Trigger Word");
    }
  };

  return (
    <div className="bg-black text-green-400 p-4 rounded-xl shadow-md">
      <h2 className="text-xl mb-2">🔐 Vault Access</h2>
      <input
        type="password"
        className="w-full p-2 mb-2 bg-gray-900 text-white"
        value={pin}
        placeholder="Enter PIN"
        onChange={(e) => setPin(e.target.value)}
      />
      <input
        type="text"
        className="w-full p-2 mb-2 bg-gray-900 text-white"
        value={trigger}
        placeholder="Say Trigger Word"
        onChange={(e) => setTrigger(e.target.value)}
      />
      <button
        className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded"
        onClick={handleAccess}
      >
        🔓 Unlock Vault
      </button>
    </div>
  );
};

