import React from 'react';

const Patients = () => {
  const mothers = [
    { id: 1, name: "Sarah Jenkins", weeks: "38", status: "In Labor", room: "Del-01", doctor: "Dr. Sharma" },
    { id: 2, name: "Priya Gupta", weeks: "32", status: "Observation", room: "Ward-B2", doctor: "Dr. Mehta" },
    { id: 3, name: "Elena Rodriguez", weeks: "40", status: "Post-Natal", room: "Ward-A1", doctor: "Dr. Sharma" },
    { id: 4, name: "Anjali Singh", weeks: "36", status: "Active Admission", room: "Ward-B5", doctor: "Dr. Varma" },
  ];

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card"><h3>4</h3><p>Active Admissions</p></div>
        <div className="stat-card"><h3>2</h3><p>Delivery Rooms Occupied</p></div>
        <div className="stat-card"><h3>12</h3><p>Upcoming Appointments</p></div>
      </div>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Pregnancy Week</th>
            <th>Status</th>
            <th>Room</th>
            <th>Assigned Doctor</th>
          </tr>
        </thead>
        <tbody>
          {mothers.map(m => (
            <tr key={m.id}>
              <td><strong>{m.name}</strong></td>
              <td>Week {m.weeks}</td>
              <td>
                <span className={`badge ${m.status === 'In Labor' ? 'badge-labor' : 'badge-active'}`}>
                  {m.status}
                </span>
              </td>
              <td>{m.room}</td>
              <td>{m.doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;