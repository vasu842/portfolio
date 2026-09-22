const initialStudents = [
  { rollNo: "101", name: "Rahul Sharma", class: "CS-A", status: "Present", notifyParent: true },
  { rollNo: "102", name: "Priya Patel", class: "CS-A", status: "Present", notifyParent: true },
  { rollNo: "103", name: "Amit Kumar", class: "CS-A", status: "Present", notifyParent: true },
  { rollNo: "104", name: "Sneha Reddy", class: "CS-A", status: "Present", notifyParent: true },
  { rollNo: "105", name: "Vikas Singh", class: "CS-A", status: "Present", notifyParent: true }
];

function AttendanceApp() {
  const [students, setStudents] = React.useState(initialStudents);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Plan A: Silent Daily Absent (Parent is NOT notified)
  const applyPlanA = (rollNo) => {
    setStudents(prev =>
      prev.map(student =>
        student.rollNo === rollNo
          ? { ...student, status: "Absent", notifyParent: false }
          : student
      )
    );
  };

  // Plan B: Auto-Fill Present
  const applyPlanB = (rollNo) => {
    setStudents(prev =>
      prev.map(student =>
        student.rollNo === rollNo
          ? { ...student, status: "Present", notifyParent: true }
          : student
      )
    );
  };

  // Standard Absent (Parent notified)
  const applyStandardAbsent = (rollNo) => {
    setStudents(prev =>
      prev.map(student =>
        student.rollNo === rollNo
          ? { ...student, status: "Absent", notifyParent: true }
          : student
      )
    );
  };

  const filteredStudents = students.filter(
    s => s.rollNo.includes(searchTerm) || s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="portal-container">
      <div className="header">
        <h1>College Attendance Portal</h1>
        <p>Daily Student Identification & Attendance Management</p>
      </div>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Roll No or Student Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Class</th>
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
              <td>{student.class}</td>
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
                <div className="btn-group">
                  <button className="btn btn-plan-a" onClick={() => applyPlanA(student.rollNo)}>
                    Plan A (Silent Absent)
                  </button>
                  <button className="btn btn-plan-b" onClick={() => applyPlanB(student.rollNo)}>
                    Plan B (Auto Present)
                  </button>
                  <button className="btn btn-standard" onClick={() => applyStandardAbsent(student.rollNo)}>
                    Standard Absent
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}