import React from 'react';

const Dashboard = ({ patients, updateStatus }) => {
  return (
    <div className="fade-in">
      <header>
        <h1>Live Ward Monitor</h1>
        <p>Current active admissions and emergency status</p>
      </header>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Mother's Name</th>
              <th>Term</th>
              <th>Status</th>
              <th>Room</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.weeks} Weeks</td>
                <td><span className={`pill ${p.status}`}>{p.status}</span></td>
                <td>{p.room}</td>
                <td>
                  <select 
                    value={p.status} 
                    onChange={(e) => updateStatus(p.id, e.target.value)}
                  >
                    <option value="Observation">Observation</option>
                    <option value="Labor">In Labor</option>
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