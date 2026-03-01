import React, { useState } from 'react';
import './styles.css';
import Dashboard from './components/Dashboard';
import AdmissionForm from './components/AdmissionForm';
import ClinicalModule from './components/ClinicalModule';
import Registry from './components/Registry';

function App() {
  const [view, setView] = useState('dashboard');
  const [patients, setPatients] = useState([
    { 
        id: 1, 
        name: "Sunita Verma", 
        aadhar: "4455-6677-8899", 
        weeks: "34", 
        status: "Observation", 
        room: "Ward-01", 
        history: [{ bp: "120/80", fhr: "145", diagnosis: "Routine Checkup", treatment: "Iron Supplements" }] 
    }
  ]);

  const addPatient = (newPatient) => {
    setPatients([newPatient, ...patients]);
    setView('dashboard');
  };

  const updateStatus = (id, newStatus) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const addMedicalRecord = (id, record) => {
    setPatients(patients.map(p => {
      if (p.id === Number(id)) {
        const history = p.history ? [...p.history, record] : [record];
        return { ...p, history };
      }
      return p;
    }));
    setView('registry');
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>MATERNITY OS</h2>
        <div className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>📊 Live Dashboard</div>
        <div className={`nav-btn ${view === 'admissions' ? 'active' : ''}`} onClick={() => setView('admissions')}>🆕 Admission</div>
        <div className={`nav-btn ${view === 'clinical' ? 'active' : ''}`} onClick={() => setView('clinical')}>🩺 Clinical Checkup</div>
        <div className={`nav-btn ${view === 'registry' ? 'active' : ''}`} onClick={() => setView('registry')}>📂 Patient Registry</div>
      </nav>

      <main className="content">
        {view === 'dashboard' && <Dashboard patients={patients} updateStatus={updateStatus} />}
        {view === 'admissions' && <AdmissionForm addPatient={addPatient} />}
        {view === 'clinical' && <ClinicalModule patients={patients} addMedicalRecord={addMedicalRecord} />}
        {view === 'registry' && <Registry patients={patients} />}
      </main>
    </div>
  );
}

export default App;