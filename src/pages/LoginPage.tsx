import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  if (user) return <Navigate to="/" replace />;

  const from = (location.state as any)?.from || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate(from);
    } else {
      setError('Invalid credentials or user does not exist');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md border-l-8 border-emerald-500 relative">
        <div className="flex flex-col items-center mb-8">
          <span className="bg-emerald-100 p-4 rounded-full mb-4">
            <Lock className="h-10 w-10 text-emerald-600" />
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-500">Welcome back! Please login to your account.</p>
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition"
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-8">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 transition"
            required
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400 transition"
        >
          Sign In
        </button>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-emerald-600 hover:underline font-medium">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 