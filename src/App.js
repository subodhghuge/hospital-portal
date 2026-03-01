import React, { useState } from 'react';
import './styles.css';

function App() {
  const [view, setView] = useState('admissions'); 
  const [searchTerm, setSearchTerm] = useState('');
  
  // The Central Database
  const [patients, setPatients] = useState([
    { id: 1, name: "Anita Rao", aadhar: "9988-7766-5544", weeks: "36", status: "Observation", room: "W-01" }
  ]);

  const [formData, setFormData] = useState({ name: '', aadhar: '', weeks: '', status: 'Observation' });

  // Quick Admit Function
  const handleAdmit = (e) => {
    e.preventDefault();
    if (formData.aadhar.length !== 12) {
      alert("Error: Aadhar must be 12 digits.");
      return;
    }
    const newPatient = {
      ...formData,
      id: Date.now(),
      room: "TBD",
      // Format Aadhar for the Registry
      aadhar: formData.aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
    };
    setPatients([newPatient, ...patients]);
    setFormData({ name: '', aadhar: '', weeks: '', status: 'Observation' });
    alert(`Success: ${newPatient.name} added to Registry!`);
    setView('registry'); // Automatically jump to registry to show the link worked
  };

  // Filter Registry by Aadhar or Name
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.aadhar.includes(searchTerm)
  );

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="logo">🏥 MATERNITY HUB</div>
        <div className={`nav-link ${view === 'admissions' ? 'active' : ''}`} onClick={() => setView('admissions')}>🆕 Quick Admit</div>
        <div className={`nav-link ${view === 'registry' ? 'active' : ''}`} onClick={() => setView('registry')}>📂 Patient Registry</div>
        <div className="nav-link">📉 Occupancy Report</div>
      </nav>

      <main className="main-content">
        {view === 'admissions' ? (
          <section className="fade-in">
            <h1>Admission Desk</h1>
            <div className="card">
              <form onSubmit={handleAdmit}>
                <div className="input-group">
                  <label>Mother's Full Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Aadhar Card Number (12 Digits)</label>
                  <input required type="text" maxLength="12" value={formData.aadhar} onChange={e => setFormData({...formData, aadhar: e.target.value})} />
                </div>
                <div className="input-group">
                  <label>Pregnancy Week</label>
                  <input required type="number" value={formData.weeks} onChange={e => setFormData({...formData, weeks: e.target.value})} />
                </div>
                <button type="submit" className="primary-btn">Complete Admission</button>
              </form>
            </div>
          </section>
        ) : (
          <section className="fade-in">
            <h1>Patient Registry</h1>
            <div className="search-bar">
              <input 
                placeholder="Search by Aadhar or Name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table className="registry-table">
              <thead>
                <tr>
                  <th>Aadhar ID</th>
                  <th>Patient Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(p => (
                  <tr key={p.id}>
                    <td><code>{p.aadhar}</code></td>
                    <td>{p.name}</td>
                    <td><span className={`pill ${p.status}`}>{p.status}</span></td>
                    <td><button className="view-btn">View Record</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;