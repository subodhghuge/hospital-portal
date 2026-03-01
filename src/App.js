import React, { useState } from 'react';
import './styles.css';

function App() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Sarah Jenkins", aadhar: "5544-2233-1100", weeks: "38", status: "Labor", room: "D-01" },
  ]);

  const [view, setView] = useState('dashboard'); // Toggle between Dashboard and Registry
  const [formData, setFormData] = useState({ name: '', aadhar: '', weeks: '', status: 'Observation' });

  const handleAdmit = (e) => {
    e.preventDefault();
    if (formData.aadhar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhar Number");
      return;
    }
    const newPatient = {
      ...formData,
      id: Date.now(),
      room: "Assigning...",
      // Formatting Aadhar for display: XXXX-XXXX-XXXX
      aadhar: formData.aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
    };
    setPatients([...patients, newPatient]);
    setFormData({ name: '', aadhar: '', weeks: '', status: 'Observation' });
    alert("Patient Admitted to Registry Successfully!");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>MATERNITY OS</h2>
        <div className={`nav-item ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>📊 Live Dashboard</div>
        <div className={`nav-item ${view === 'registry' ? 'active' : ''}`} onClick={() => setView('registry')}>👩‍🍼 Patient Registry</div>
        <div className="nav-item">📅 Appointments</div>
      </aside>

      <main className="main-content">
        {view === 'dashboard' ? (
          <>
            <header>
              <h1>Quick Admission Desk</h1>
              <p>Secure Mother & Child Registration</p>
            </header>

            <div className="admission-form-container">
              <form onSubmit={handleAdmit} className="admit-form">
                <div className="form-group">
                  <label>Full Name (As per Aadhar)</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Sunita Sharma" />
                </div>
                <div className="form-group">
                  <label>Aadhar Card Number (12 Digits)</label>
                  <input required type="number" value={formData.aadhar} onChange={e => setFormData({...formData, aadhar: e.target.value})} placeholder="0000 0000 0000" />
                </div>
                <div className="form-group">
                  <label>Current Pregnancy Week</label>
                  <input required type="number" value={formData.weeks} onChange={e => setFormData({...formData, weeks: e.target.value})} placeholder="e.g. 36" />
                </div>
                <button type="submit" className="btn-primary">Confirm Admission</button>
              </form>
            </div>
          </>
        ) : (
          <>
            <header>
              <h1>Patient Registry</h1>
              <p>Historical Records & Active Admissions</p>
            </header>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Aadhar ID</th>
                  <th>Mother's Name</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td><code>{p.aadhar}</code></td>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.weeks} Wks</td>
                    <td><span className={`status-pill ${p.status}`}>{p.status}</span></td>
                    <td><button className="btn-outline">View Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

export default App;