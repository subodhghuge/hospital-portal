import React from 'react';

const Registry = ({ patients }) => {
  const [search, setSearch] = React.useState('');
  
  const handlePrint = () => {
    window.print();
  };

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.aadhar.includes(search)
  );

  return (
    <div className="fade-in">
      {/* Hidden Header for PDF/Print only */}
      <div className="print-header">
        <h1>MATERNITY HOME DISCHARGE SUMMARY</h1>
        <p>123 Medical Drive, Healthcare City | Tel: +91 98765 43210</p>
      </div>

      <header><h1>Master Patient Registry</h1></header>
      <input className="card" style={{width: '95%'}} placeholder="Search Aadhar or Name..." onChange={e => setSearch(e.target.value)} />
      
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Aadhar</th>
              <th>Mother's Name</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td><code>{p.aadhar}</code></td>
                <td><strong>{p.name}</strong></td>
                <td>
                    {p.isDischarged ? 
                        <span className="pill" style={{background: '#64748b'}}>Discharged</span> : 
                        <span className={`pill ${p.status}`}>Active</span>
                    }
                </td>
                <td>
                    {p.isDischarged ? (
                      <button 
                        onClick={handlePrint}
                        className="view-btn" 
                        style={{color: '#0ea5e9', border: '1px solid #0ea5e9', padding: '5px 10px', borderRadius: '5px', background: 'none', cursor: 'pointer'}}
                      >
                        📄 Print PDF
                      </button>
                    ) : (
                      <span style={{color: '#94a3b8', fontSize: '0.8rem'}}>Stay in Progress</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Registry;