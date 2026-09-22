function AttendancePortal() {
  const [students, setStudents] = React.useState(() => {
    const saved = localStorage.getItem('ai_attendance_data');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  
  const [searchTerm, setSearchTerm] = React.useState('');

  // Persist data locally
  React.useEffect(() => {
    localStorage.setItem('ai_attendance_data', JSON.stringify(students));
  }, [students]);

  const handleAction = (rollNo, action) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.rollNo !== rollNo) return student;
        switch (action) {
          case 'plan_a': // Silent Absent
            return { ...student, status: 'Absent', notifyParent: false };
          case 'plan_b': // Auto Present
            return { ...student, status: 'Present', notifyParent: true };
          case 'standard': // Standard Absent
            return { ...student, status: 'Absent', notifyParent: true };
          default:
            return student;
        }
      })
    );
  };

  const filteredStudents = students.filter(
    s => s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
         s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portal-container">
      <div className="header">
        <h1>College Attendance Portal</h1>
        <p>Department of Artificial Intelligence (AI) — Daily Roll Register</p>
      </div>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Roll No (e.g. 25G01A4370) or Student Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Dept</th>
            <th>Status</th>
            <th>Parent Alert</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.rollNo}>
              <td><strong>{student.rollNo}</strong></td>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>
                <span className={`badge ${student.status === 'Present' ? 'badge-present' : 'badge-absent'}`}>
                  {student.status}
                </span>
              </td>
              <td>
                {student.status === 'Absent' ? (
                  student.notifyParent ? (
                    <span className="badge badge-sent">SMS Sent</span>
                  ) : (
                    <span className="badge badge-suppressed">Plan A: Suppressed</span>
                  )
                ) : (
                  <span style={{ color: '#94a3b8' }}>—</span>
                )}
              </td>
              <td>
                <select
                  className="action-dropdown"
                  value={student.status === 'Present' ? 'plan_b' : student.notifyParent ? 'standard' : 'plan_a'}
                  onChange={(e) => handleAction(student.rollNo, e.target.value)}
                >
                  <option value="plan_b">Plan B: Auto Present</option>
                  <option value="plan_a">Plan A: Silent Absent</option>
                  <option value="standard">Standard Absent (SMS)</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}