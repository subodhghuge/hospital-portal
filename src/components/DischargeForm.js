import React, { useState } from 'react';

const DischargeForm = ({ patient, onConfirm, onCancel }) => {
  const [summary, setSummary] = useState({ outcome: 'Normal Delivery', babyWeight: '', notes: '' });

  if (!patient) return null;

  return (
    <div className="fade-in">
      <header><h1>Discharge Summary: {patient.name}</h1></header>
      <div className="card" style={{maxWidth: '600px', borderTop: '5px solid #22c55e'}}>
        <div className="form-group">
          <label>Delivery Outcome</label>
          <select value={summary.outcome} onChange={e => setSummary({...summary, outcome: e.target.value})}>
            <option value="Normal Delivery">Normal Delivery</option>
            <option value="C-Section">C-Section</option>
            <option value="Observation Only">Observation Only</option>
          </select>
        </div>
        <div className="form-group">
          <label>Baby Weight (kg)</label>
          <input type="number" step="0.1" value={summary.babyWeight} onChange={e => setSummary({...summary, babyWeight: e.target.value})} placeholder="e.g. 3.2" />
        </div>
        <div className="form-group">
          <label>Discharge Notes / Advice</label>
          <textarea value={summary.notes} onChange={e => setSummary({...summary, notes: e.target.value})} placeholder="Medication or follow-up dates..." />
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
            <button className="submit-btn" style={{background: '#22c55e'}} onClick={() => onConfirm(patient.id, summary)}>Finalize Discharge</button>
            <button className="submit-btn" style={{background: '#64748b'}} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DischargeForm;