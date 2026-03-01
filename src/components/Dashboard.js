import React from 'react';

const Dashboard = ({ patients, updateStatus }) => {
  return (
    <div>
      <h1>Live Ward Monitor</h1>
      <div className="card">
        <table>
          <thead>
            <tr><th>Patient</th><th>Aadhar</th><th>Week</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.aadhar}</td>
                <td>{p.weeks}</td>
                <td><span className={`pill ${p.status}`}>{p.status}</span></td>
                <td>
                  <select onChange={(e) => updateStatus(p.id, e.target.value)} value={p.status}>
                    <option value="Observation">Observation</option>
                    <option value="Labor">Labor</option>
                    <option value="Post-Natal">Post-Natal</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;