import React, { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username:'', password:'' });
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || '/admin';

  function submit(e) {
    e.preventDefault();
    if (login(form)) {
      nav(from, { replace:true });
    } else {
      alert('Invalid');
    }
  }

  return (
    <main className="container py-5" style={{maxWidth:400}}>
      <h1 className="text-center mb-4">Admin Login</h1>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            className="form-control"
            value={form.username}
            onChange={e=>setForm({...form,username:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={form.password}
            onChange={e=>setForm({...form,password:e.target.value})}
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </main>
  );
}
