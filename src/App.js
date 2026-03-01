import React, { useState } from 'react';
import './styles.css';
import AdmissionForm from './components/AdmissionForm';
import Dashboard from './components/Dashboard';
import Registry from './components/Registry';

function App() {
  const [view, setView] = useState('dashboard');
  const [patients, setPatients] = useState([
    { id: 1, name: "Anita Rao", aadhar: "9988-7766-5544", weeks: "36", status: "Observation", room: "W-01" }
  ]);

  const addPatient = (newPatient) => {
    setPatients([newPatient, ...patients]);
    setView('dashboard'); // Go to dashboard after admission
  };

  const updateStatus = (id, newStatus) => {
    setPatients(patients.map(p => p.id === id ? {...p, status: newStatus} : p));
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>MATERNITY OS</h2>
        <div className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>📊 Dashboard</div>
        <div className={`nav-btn ${view === 'admissions' ? 'active' : ''}`} onClick={() => setView('admissions')}>🆕 Admission</div>
        <div className={`nav-btn ${view === 'registry' ? 'active' : ''}`} onClick={() => setView('registry')}>📂 Registry</div>
      </aside>

      <main className="content">
        {view === 'dashboard' && <Dashboard patients={patients} updateStatus={updateStatus} />}
        {view === 'admissions' && <AdmissionForm addPatient={addPatient} />}
        {view === 'registry' && <Registry patients={patients} />}
      </main>
    </div>
  );
}
export default App;