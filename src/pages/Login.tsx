import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      window.dispatchEvent(new Event('auth-change'));
      navigate('/admin');
    } else if (username && password) {
      // Allow any other non-empty credentials as client
      localStorage.setItem('userRole', 'client');
      localStorage.setItem('username', username);
      window.dispatchEvent(new Event('auth-change'));
      alert('Сәтті кірдіңіз!');
      navigate('/');
    } else {
      alert('Логин мен құпиясөзді енгізіңіз!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Админге кіру</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            Кіру
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-500">
          Аккаунтыңыз жоқ па? <a href="/register" className="text-emerald-600 hover:underline">Тіркелу</a>
        </div>
      </div>
    </div>
  );
}
