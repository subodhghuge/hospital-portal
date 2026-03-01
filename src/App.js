import React from 'react';
import './styles.css';
import Patients from './components/Patients';

function App() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 style={{color: '#0891b2'}}>Maternity Care</h2>
        <nav>
          <p><strong>📊 Dashboard</strong></p>
          <p>👩‍🍼 Patients</p>
          <p>📅 Appointments</p>
          <p>🏥 Inventory</p>
          <hr />
          <p>⚙️ Settings</p>
        </nav>
      </aside>
      
      <main className="main-content">
        <header style={{marginBottom: '2rem'}}>
          <h1>Maternity Home Management Portal</h1>
          <p>Welcome back, Administrator | {new Date().toLocaleDateString()}</p>
        </header>
        
        <Patients />
      </main>
    </div>
  );
}

export default App;