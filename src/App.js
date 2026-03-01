import React, { useState } from 'react';
import './styles.css';

function App() {
  // Initial Demo Data
  const [patients, setPatients] = useState([
    { id: 1, name: "Sarah Jenkins", weeks: "38", status: "Labor", room: "D-01" },
    { id: 2, name: "Priya Gupta", weeks: "32", status: "Observation", room: "W-12" },
    { id: 3, name: "Elena Rodriguez", weeks: "40", status: "Post-Natal", room: "W-05" }
  ]);

  const [newName, setNewName] = useState("");

  // Function to Admit New Patient
  const addPatient = () => {
    if (!newName) return;
    const newEntry = {
      id: Date.now(),
      name: newName,
      weeks: "TBD",
      status: "Observation",
      room: "TBD"
    };
    setPatients([...patients, newEntry]);
    setNewName("");
  };

  // Function to Discharge
  const discharge = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>MATERNITY HOME OS</h2>
        <div className="nav-item">📊 Dashboard</div>
        <div className="nav-item">👩‍🍼 Patient Registry</div>
        <div className="nav-item">📅 Appointments</div>
        <div className="nav-item">💊 Inventory</div>
      </aside>

      <main className="main-content">
        <header>
          <h1>Maternity Command Center</h1>
          <p>Real-time Facility Overview</p>
        </header>

        <div className="stats-bar">
          <div className="stat-card"><h3>Total Admissions</h3><p>{patients.length}</p></div>
          <div className="stat-card"><h3>In Labor</h3><p>{patients.filter(p => p.status === 'Labor').length}</p></div>
          <div className="stat-card"><h3>Available Beds</h3><p>{20 - patients.length}</p></div>
          <div className="stat-card"><h3>Critical Alerts</h3><p style={{color: 'red'}}>0</p></div>
        </div>

        <div className="action-bar">
          <input 
            placeholder="Enter Mother's Full Name to Admit..." 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn-add" onClick={addPatient}>+ Quick Admit</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Term</th>
              <th>Current Status</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.weeks} Weeks</td>
                <td><span className={`status-pill ${p.status}`}>{p.status}</span></td>
                <td>{p.room}</td>
                <td>
                  <button className="btn-discharge" onClick={() => discharge(p.id)}>Discharge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;