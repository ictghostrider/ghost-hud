import React, { useEffect, useState } from 'react';

const SystemStats = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await fetch('/api/system/performance');
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="text-white">Loading system stats...</div>;

  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-xl shadow-lg text-green-400">
      <h2 className="text-xl font-bold mb-2">🔧 System Performance</h2>
      <p>🧠 CPU Load: <span className="text-white">{stats.cpu}%</span></p>
      <p>💾 RAM Used: <span className="text-white">{stats.ram.used} GB</span> / {stats.ram.total} GB</p>
      <p>📊 RAM Usage: <span className="text-white">{stats.ram.percent}%</span></p>
      <p>⏳ Uptime: <span className="text-white">{Math.floor(stats.uptime / 60)} mins</span></p>
    </div>
  );
};

export default SystemStats;
