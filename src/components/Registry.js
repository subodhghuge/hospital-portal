import React, { useState } from 'react';

const Registry = ({ patients }) => {
  const [search, setSearch] = useState('');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.aadhar.includes(search));

  return (
    <div className="fade-in">
      <header><h1>Patient Registry</h1></header>
      <div className="form-group">
        <input className="card" style={{width: '95%'}} placeholder="Search Aadhar or Name..." onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Aadhar</th>
              <th>Mother's Name</th>
              <th>Latest Diagnosis</th>
              <th>Records</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><code>{p.aadhar}</code></td>
                <td><strong>{p.name}</strong></td>
                <td>
                  {p.history && p.history.length > 0 ? (
                    <span style={{color: '#0ea5e9'}}>🩺 {p.history[p.history.length-1].diagnosis}</span>
                  ) : (
                    <span style={{color: '#94a3b8'}}>New Admission</span>
                  )}
                </td>
                <td>{p.history ? p.history.length : 0} Visit(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registry;