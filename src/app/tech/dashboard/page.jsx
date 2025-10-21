
'use client'
import { useEffect, useState } from 'react';

export default function TechDashboard(){
  const [tickets,setTickets]=useState([]);
  useEffect(()=>{ load() },[]);
  async function load(){
    const token = localStorage.getItem('token');
    const res = await fetch('/api/tickets', { headers: { Authorization: 'Bearer '+token }});
    const data = await res.json();
    setTickets(data);
  }
  return (
    <div>
      <h2>Dashboard - Técnico</h2>
      <div style={{display:'grid',gap:12}}>
        {tickets.map(t=>(
          <div className="ticket card" key={t._id}>
            <strong>{t.title}</strong> <small>({t.priority})</small>
            <p>{t.description}</p>
            <p>Aberto por: {t.createdBy?.name || '—'}</p>
            <p className={`status-${t.status}`}>Status: {t.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
