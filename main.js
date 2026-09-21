const { useState, useEffect } = React;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly performance report', completed: true },
    { id: 2, text: 'Design new landing page mockups', completed: false },
    { id: 3, text: 'Setup client onboarding call', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask.trim(), completed: false }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <i className="fa-solid fa-chart-line"></i>
          <span>DevDash</span>
        </div>
        <ul className="nav-links">
          {['Dashboard', 'Tasks', 'Analytics', 'Settings'].map((tab) => (
            <li
              key={tab}
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <i className={`fa-solid ${
                tab === 'Dashboard' ? 'fa-house' : 
                tab === 'Tasks' ? 'fa-list-check' : 
                tab === 'Analytics' ? 'fa-chart-pie' : 'fa-gear'
              }`}></i>
              <span>{tab}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <header className="header-bar">
          <div>
            <h2>{activeTab} Overview</h2>
          </div>
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>

        <section className="metrics-grid">
          <div className="metric-card">
            <h3>Total Tasks</h3>
            <div className="value">{tasks.length}</div>
          </div>
          <div className="metric-card">
            <h3>Completed</h3>
            <div className="value" style={{ color: '#10b981' }}>
              {tasks.filter(t => t.completed).length}
            </div>
          </div>
          <div className="metric-card">
            <h3>Pending</h3>
            <div className="value" style={{ color: '#f59e0b' }}>
              {tasks.filter(t => !t.completed).length}
            </div>
          </div>
        </section>

        <section className="card">
          <h3 style={{ marginBottom: '16px' }}>Task Management</h3>
          <form onSubmit={handleAddTask} className="task-input-group">
            <input
              type="text"
              placeholder="What needs to be done today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn-primary">Add Task</button>
          </form>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.text}</span>
                </div>
                <button className="btn-delete" onClick={() => deleteTask(task.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);   