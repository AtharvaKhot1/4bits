import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 mb-24 p-8 bg-FITZY-dark/70 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Log In</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-FITZY-dark/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-FITZY-teal text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-FITZY-dark/50 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-FITZY-teal text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-FITZY-teal transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Log In'}
        </button>
      </form>

      <div className="mt-4 text-center text-gray-400">
        Don't have an account? <Link to="/signup" className="text-FITZY-teal hover:underline">Sign Up</Link>
      </div>
    </div>
  );
}
