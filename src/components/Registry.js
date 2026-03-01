import React, { useState } from 'react';

const Registry = ({ patients }) => {
  const [search, setSearch] = useState('');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.aadhar.includes(search));

  return (
    <div className="fade-in">
      <header><h1>Master Patient Registry</h1></header>
      <input className="card" style={{width: '95%'}} placeholder="Search Aadhar or Name..." onChange={e => setSearch(e.target.value)} />
      
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Aadhar</th>
              <th>Mother's Name</th>
              <th>Current State</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{opacity: p.isDischarged ? 0.7 : 1}}>
                <td><code>{p.aadhar}</code></td>
                <td><strong>{p.name}</strong></td>
                <td>
                    {p.isDischarged ? 
                        <span className="pill" style={{background: '#64748b'}}>Discharged ({p.dischargeDate})</span> : 
                        <span className={`pill ${p.status}`}>Active: {p.status}</span>
                    }
                </td>
                <td style={{fontSize: '0.85rem'}}>
                    {p.isDischarged ? 
                        `Outcome: ${p.dischargeSummary.outcome}` : 
                        `Latest: ${p.history?.[p.history.length-1]?.diagnosis || "New Admission"}`
                    }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registry;