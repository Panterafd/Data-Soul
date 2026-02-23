import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Құпиясөздер сәйкес келмейді!');
      return;
    }

    // Mock registration logic
    // In a real app, this would send data to a backend API
    console.log('Registering user:', { username, password });
    
    // Simulate successful registration
    // For demo purposes, we can't really "save" the user to the backend without a real DB,
    // but we can simulate the flow.
    localStorage.setItem('registeredUser', username); // Just to show something happened
    
    alert('Тіркелу сәтті аяқталды! Енді кіре аласыз.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Тіркелу</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Логин</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Құпиясөз</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Құпиясөзді растау</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            Тіркелу
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-500">
          Аккаунтыңыз бар ма? <a href="/login" className="text-emerald-600 hover:underline">Кіру</a>
        </div>
      </div>
    </div>
  );
}
