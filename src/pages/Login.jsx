// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (login({ username, password })) {
      // replace history so Back button won't return here
      navigate('/admin', { replace: true });
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth:400}}>
        {/* username & password fields */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Log In</button>
      </form>
    </main>
  );
}
