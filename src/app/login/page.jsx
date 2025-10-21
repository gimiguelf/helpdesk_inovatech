
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();
  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/auth/login', { method:'POST', body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      // naive role routing (frontend will fetch user data in real app)
      router.push('/employee/dashboard');
    } else {
      alert(data.error || 'Erro');
    }
  }
  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <div><input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><input placeholder="senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
