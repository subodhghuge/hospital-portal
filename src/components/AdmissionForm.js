import React, { useState } from 'react';

const AdmissionForm = ({ addPatient }) => {
  const [formData, setFormData] = useState({ name: '', aadhar: '', weeks: '', status: 'Observation' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.aadhar.length !== 12) return alert("Invalid Aadhar");
    addPatient({
      ...formData,
      id: Date.now(),
      room: "TBD",
      aadhar: formData.aadhar.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3')
    });
  };

  return (
    <div className="card" style={{maxWidth: '500px'}}>
      <h3>Patient Intake Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><label>Full Name</label><input required onChange={e => setFormData({...formData, name: e.target.value})} /></div>
        <div className="form-group"><label>Aadhar Number</label><input required type="text" maxLength="12" onChange={e => setFormData({...formData, aadhar: e.target.value})} /></div>
        <div className="form-group"><label>Pregnancy Week</label><input required type="number" onChange={e => setFormData({...formData, weeks: e.target.value})} /></div>
        <button className="submit-btn">Admit to Ward</button>
      </form>
    </div>
  );
};
export default AdmissionForm;