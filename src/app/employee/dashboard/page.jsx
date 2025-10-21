
'use client'
import { useEffect, useState } from 'react';

export default function EmployeeDashboard(){
  const [tickets,setTickets]=useState([]);
  useEffect(()=>{ load() },[]);
  async function load(){
    const token = localStorage.getItem('token');
    const res = await fetch('/api/tickets?my=true', { headers: { Authorization: 'Bearer '+token }});
    const data = await res.json();
    setTickets(data);
  }
  return (
    <div>
      <h2>Dashboard - Funcionário</h2>
      <div className="ticket-list">
        {tickets.map(t=>(
          <div className="ticket card" key={t._id}>
            <h4>{t.title} <small>({t.priority})</small></h4>
            <p>{t.description}</p>
            <p className={`status-${t.status}`}>Status: {t.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
