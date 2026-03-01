import React, { useState } from 'react';

const ClinicalModule = ({ patients, addMedicalRecord }) => {
  const [selectedId, setSelectedId] = useState('');
  const [record, setRecord] = useState({ bp: '', fhr: '', diagnosis: '', treatment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Select a patient first");
    addMedicalRecord(selectedId, record);
    setRecord({ bp: '', fhr: '', diagnosis: '', treatment: '' });
    alert("Medical Record Updated!");
  };

  return (
    <div className="card">
      <h2>Clinical Assessment & Treatment</h2>
      <form onSubmit={handleSubmit} className="clinical-form">
        <div className="form-group">
          <label>Select Patient</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">-- Choose Admitted Mother --</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.aadhar})</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label>Blood Pressure (e.g. 120/80)</label>
            <input value={record.bp} onChange={e => setRecord({...record, bp: e.target.value})} placeholder="BP" />
          </div>
          <div className="form-group">
            <label>Fetal Heart Rate (BPM)</label>
            <input value={record.fhr} onChange={e => setRecord({...record, fhr: e.target.value})} placeholder="e.g. 140" />
          </div>
        </div>

        <div className="form-group">
          <label>Diagnosis / Observations</label>
          <textarea value={record.diagnosis} onChange={e => setRecord({...record, diagnosis: e.target.value})} placeholder="Describe condition..." />
        </div>

        <div className="form-group">
          <label>Treatment / Medications</label>
          <textarea value={record.treatment} onChange={e => setRecord({...record, treatment: e.target.value})} placeholder="Enter dosage..." />
        </div>

        <button className="submit-btn" style={{background: '#059669'}}>Save Clinical Record</button>
      </form>
    </div>
  );
};

export default ClinicalModule;