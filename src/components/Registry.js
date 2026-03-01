import React, { useState } from 'react';

const Registry = ({ patients }) => {
  const [search, setSearch] = useState('');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.aadhar.includes(search));

  return (
    <div>
      <h1>Patient Registry</h1>
      <input className="card" placeholder="Search by Name or Aadhar..." onChange={e => setSearch(e.target.value)} style={{width: '100%'}} />
      <div className="card">
        <table>
          <thead>
            <tr><th>Aadhar ID</th><th>Patient Name</th><th>Admitted On</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><code>{p.aadhar}</code></td>
                <td>{p.name}</td>
                <td>{new Date(p.id).toLocaleDateString()}</td>
                <td>{p.history ? (<small>Last: {p.history[p.history.length-1].diagnosis}</small>) : "No records yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Registry;