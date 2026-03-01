import React, { useState } from 'react';

const ClinicalModule = ({ patients, addMedicalRecord }) => {
  const [selectedId, setSelectedId] = useState('');
  const [record, setRecord] = useState({ bp: '', fhr: '', diagnosis: '', treatment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Select a patient.");
    addMedicalRecord(selectedId, record);
    setRecord({ bp: '', fhr: '', diagnosis: '', treatment: '' });
  };

  return (
    <div className="fade-in">
      <header><h1>Clinical Checkup</h1></header>
      <div className="card" style={{maxWidth: '700px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Patient</label>
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
              <option value="">-- Choose Mother --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.aadhar})</option>)}
            </select>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div className="form-group"><label>BP (e.g. 120/80)</label><input value={record.bp} onChange={e => setRecord({...record, bp: e.target.value})} /></div>
            <div className="form-group"><label>FHR (BPM)</label><input value={record.fhr} onChange={e => setRecord({...record, fhr: e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Clinical Diagnosis</label><textarea value={record.diagnosis} onChange={e => setRecord({...record, diagnosis: e.target.value})} /></div>
          <div className="form-group"><label>Treatment Plan</label><textarea value={record.treatment} onChange={e => setRecord({...record, treatment: e.target.value})} /></div>
          <button type="submit" className="submit-btn" style={{background: '#10b981'}}>Save & Update History</button>
        </form>
      </div>
    </div>
  );
};

export default ClinicalModule;