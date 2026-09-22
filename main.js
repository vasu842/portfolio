const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<AttendanceApp />);
// Updated Action Cell in React JSX
<td style={{ padding: '12px' }}>
  <select
    value={student.planType || 'standard'}
    onChange={(e) => handlePlanChange(student.rollNo, e.target.value)}
    className="action-dropdown"
  >
    <option value="present">Mark Present</option>
    <option value="plan_a">Plan A: Silent Absent</option>
    <option value="plan_b">Plan B: Auto Present</option>
    <option value="standard_absent">Standard Absent (Send SMS)</option>
  </select>
</td>