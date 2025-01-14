// src/pages/Login.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const CLOUDFLARE_AUTH_URL = 'https://serverlessdemo.ryanhardestylewis.workers.dev/'; 
// Adjust to your actual Worker URL

function Login() {
  const [password, setPassword] = useState('password'); // set to 'password' for demo, should be '' in prod
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On mount, check if we already have a GitHub token
  useEffect(() => {
    const token = localStorage.getItem('githubToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1) Call the Cloudflare Worker with user-supplied password
      const resp = await fetch(CLOUDFLARE_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!resp.ok) {
        // Might be 401 or 400
        const data = await resp.json();
        alert(data.error || 'Invalid password');
        return;
      }

      // 2) Success => store GitHub token
      const data = await resp.json();
      if (data.success && data.token) {
        localStorage.setItem('githubToken', data.token);
        alert('Logged in successfully!');
        setIsLoggedIn(true);
        navigate('/'); 
      } else {
        alert(data.error || 'Invalid password');
      }
    } catch (err: any) {
      console.error('Error contacting auth worker:', err);
      alert('Authentication error. Check console.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('githubToken');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen px-6 dark:bg-gray-900 bg-white">
        <div className="text-gray-800 dark:text-gray-100 flex flex-col items-center">
          <Lock className="w-14 h-14 mb-2" />
          <h1 className="text-3xl font-bold">You are already logged in</h1>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 dark:bg-gray-900 bg-white">
      <div className="flex flex-col items-center mb-8 text-gray-800 dark:text-gray-100">
        <Lock className="w-14 h-14 mb-2" />
        <h1 className="text-3xl font-bold">Admin Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-2 rounded-md border border-gray-300 text-lg outline-none focus:border-indigo-500 transition"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
