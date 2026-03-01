import React, { useState } from 'react';

const AdmissionForm = ({ addPatient }) => {
  const [formData, setFormData] = useState({ name: '', aadhar: '', weeks: '', status: 'Observation' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.aadhar.length !== 12) {
      alert("Aadhar must be exactly 12 digits.");
      return;
    }
    addPatient({
      ...formData,
      id: Date.now(),
      room: "TBD",
      history: [],
      aadhar: formData.aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
    });
  };

  return (
    <div className="fade-in">
      <header><h1>New Admission</h1></header>
      <div className="card" style={{maxWidth: '600px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name (As per Aadhar)</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" />
          </div>
          <div className="form-group">
            <label>Aadhar Number (12 Digits)</label>
            <input required type="text" maxLength="12" value={formData.aadhar} onChange={e => setFormData({...formData, aadhar: e.target.value})} placeholder="XXXX XXXX XXXX" />
          </div>
          <div className="form-group">
            <label>Weeks of Pregnancy</label>
            <input required type="number" value={formData.weeks} onChange={e => setFormData({...formData, weeks: e.target.value})} placeholder="e.g. 38" />
          </div>
          <button type="submit" className="submit-btn">Admit to Registry</button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;