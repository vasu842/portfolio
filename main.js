const { useState, useEffect } = React;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly report', completed: true },
    { id: 2, text: 'Design new landing page mockups', completed: false },
    { id: 3, text: 'Setup client onboarding call', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  // Toggle Task Completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
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

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header-bar">
          <h1>{activeTab} Overview</h1>
          <button className="theme-toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>

        {/* Metrics Grid */}
        <section className="metrics-grid">
          <div className="metric-card">
            <h3>Total Tasks</h3>
            <div className="value">{tasks.length}</div>
          </div>
          <div className="metric-card">
            <h3>Completed</h3>
            <div className="value">{tasks.filter(t => t.completed).length}</div>
          </div>
          <div className="metric-card">
            <h3>Pending</h3>
            <div className="value">{tasks.filter(t => !t.completed).length}</div>
          </div>
        </section>

        {/* Task Management Section */}
        <section className="card">
          <h2>Task Manager</h2>
          <form onSubmit={addTask} className="task-input-group">
            <input 
              type="text" 
              placeholder="Add a new task..." 
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
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

// Render React App to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);