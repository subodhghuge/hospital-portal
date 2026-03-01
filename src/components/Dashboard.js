import React from 'react';

const Dashboard = ({ patients, updateStatus, onDischargeClick }) => {
  return (
    <div className="fade-in">
      <header>
        <h1>Live Ward Monitor</h1>
        <p>Currently {patients.length} mothers in active care</p>
      </header>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Mother's Name</th>
              <th>Status</th>
              <th>Room</th>
              <th>Update Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td><span className={`pill ${p.status}`}>{p.status}</span></td>
                <td>{p.room}</td>
                <td>
                  <select value={p.status} onChange={(e) => updateStatus(p.id, e.target.value)}>
                    <option value="Observation">Observation</option>
                    <option value="Labor">In Labor</option>
                    <option value="Post-Natal">Post-Natal</option>
                  </select>
                </td>
                <td>
                    <button className="view-btn" style={{color: '#22c55e', border: '1px solid #22c55e', padding: '5px 10px', borderRadius: '5px', background: 'none', cursor: 'pointer'}} 
                    onClick={() => onDischargeClick(p)}>Discharge</button>
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