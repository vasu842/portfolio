import React, { useState, useEffect } from 'react';
import { initialStudents } from './initialData.js';

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('ai_attendance_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialStudents.length) {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
    return initialStudents;
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('ai_attendance_data', JSON.stringify(students));
  }, [students]);

  const handleAction = (rollNo, action) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.rollNo !== rollNo) return student;
        if (action === 'plan_a') return { ...student, status: 'Absent', notifyParent: false };
        if (action === 'plan_b') return { ...student, status: 'Present', notifyParent: true };
        if (action === 'standard') return { ...student, status: 'Absent', notifyParent: true };
        return student;
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
        <p>Department of Artificial Intelligence (AI) — Daily Roll Register ({students.length} Total)</p>
      </div>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search Roll No or Student Name..."
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-message">
                No matching student records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}