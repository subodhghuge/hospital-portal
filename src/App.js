import React, { useState } from 'react';
import './styles.css';
import Dashboard from './components/Dashboard';
import AdmissionForm from './components/AdmissionForm';
import ClinicalModule from './components/ClinicalModule';
import Registry from './components/Registry';
import DischargeForm from './components/DischargeForm';

function App() {
  const [view, setView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState(''); // Added Search State
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [patients, setPatients] = useState([
    { 
        id: 1, 
        name: "Navneet Shah", 
        aadhar: "4455-6677-8899", 
        weeks: "34", 
        status: "Observation", 
        room: "Ward-01", 
        history: [{ bp: "120/80", fhr: "145", diagnosis: "Routine Checkup", treatment: "Iron" }],
        isDischarged: false
    },
    { 
        id: 2, 
        name: "Priya Sharma", 
        aadhar: "1122-3344-5566", 
        weeks: "38", 
        status: "Labor", 
        room: "LDR-02", 
        history: [{ bp: "135/90", fhr: "155", diagnosis: "Active Labor", treatment: "IV Fluids" }],
        isDischarged: false
    },
    { 
        id: 3, 
        name: "Anjali Gupta", 
        aadhar: "9988-7766-5544", 
        weeks: "36", 
        status: "Post-Natal", 
        room: "Recovery-05", 
        history: [{ bp: "110/70", fhr: "N/A", diagnosis: "Stable", treatment: "Rest" }],
        isDischarged: false
    }
  ]);

  // RESTORED: This was the missing function
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

  const processDischarge = (id, summary) => {
    setPatients(patients.map(p => {
      if (p.id === id) {
        return { ...p, isDischarged: true, dischargeSummary: summary, dischargeDate: new Date().toLocaleDateString() };
      }
      return p;
    }));
    setView('registry');
  };

  // Logic to filter the list based on Search Bar
  const filteredPatients = patients.filter(p => 
    !p.isDischarged && 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     p.aadhar.includes(searchTerm))
  );

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2>MATERNITY OS</h2>
        <div className="nav-btns-wrapper"> {/* Add this wrapper */}
          <div className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}>📊 Dashboard</div>
          <div className={`nav-btn ${view === 'admissions' ? 'active' : ''}`} onClick={() => setView('admissions')}>🆕 Admission</div>
          <div className={`nav-btn ${view === 'clinical' ? 'active' : ''}`} onClick={() => setView('clinical')}>🩺 Clinical</div>
          <div className={`nav-btn ${view === 'registry' ? 'active' : ''}`} onClick={() => setView('registry')}>📂 Registry</div>
        </div>
      </nav>

      <main className="content">
        {view === 'dashboard' && (
          <div className="fade-in">
            <header>
              <h1>Live Ward Monitor</h1>
              <div className="search-container" style={{ marginTop: '20px' }}>
                <input 
                  type="text" 
                  placeholder="🔍 Search Name or Aadhar..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </header>
            <Dashboard 
                patients={filteredPatients} 
                updateStatus={updateStatus} 
                onDischargeClick={(p) => { setSelectedPatient(p); setView('discharge-form'); }}
            />
          </div>
        )}
        {view === 'admissions' && <AdmissionForm addPatient={addPatient} />}
        {view === 'clinical' && <ClinicalModule patients={patients.filter(p => !p.isDischarged)} addMedicalRecord={addMedicalRecord} />}
        {view === 'registry' && <Registry patients={patients} />}
        {view === 'discharge-form' && <DischargeForm patient={selectedPatient} onConfirm={processDischarge} onCancel={() => setView('dashboard')} />}
      </main>
    </div>
  );
}

export default App;