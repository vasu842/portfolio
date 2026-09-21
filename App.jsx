import React, { useState, useEffect } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review quarterly performance report', completed: true },
    { id: 2, text: 'Design new landing page mockups', completed: false },
    { id: 3, text: 'Setup client onboarding call', completed: false },
    { id: 4, text: 'Update dependencies and run tests', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle Dark Mode on body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Handle task addition
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const item = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    };
    
    setTasks((prev) => [item, ...prev]);
    setNewTask('');
  };

  // Toggle completion status
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Remove task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
              <i
                className={`fa-solid ${
                  tab === 'Dashboard'
                    ? 'fa-house'
                    : tab === 'Tasks'
                    ? 'fa-list-check'
                    : tab === 'Analytics'
                    ? 'fa-chart-pie'
                    : 'fa-gear'
                }`}
              ></i>
              <span>{tab}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="header-bar">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700' }}>{activeTab} Overview</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              Welcome back! Here is what is happening today.
            </p>
          </div>
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </header>

        {/* Top Key Metrics */}
        <section className="metrics-grid">
          <div className="metric-card">
            <h3>Total Tasks</h3>
            <div className="value">{tasks.length}</div>
          </div>
          <div className="metric-card">
            <h3>Completed</h3>
            <div className="value" style={{ color: '#10b981' }}>
              {tasks.filter((t) => t.completed).length}
            </div>
          </div>
          <div className="metric-card">
            <h3>Pending</h3>
            <div className="value" style={{ color: '#f59e0b' }}>
              {tasks.filter((t) => !t.completed).length}
            </div>
          </div>
          <div className="metric-card">
            <h3>Completion Rate</h3>
            <div className="value" style={{ color: '#6366f1' }}>
              {tasks.length > 0
                ? `${Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100)}%`
                : '0%'}
            </div>
          </div>
        </section>

        {/* Task Management Panel */}
        <section className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2>Task Management</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {tasks.filter((t) => !t.completed).length} items remaining
            </span>
          </div>

          <form onSubmit={handleAddTask} className="task-input-group">
            <input
              type="text"
              placeholder="What needs to be done today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              <i className="fa-solid fa-plus" style={{ marginRight: '6px' }}></i>
              Add Task
            </button>
          </form>

          <ul className="task-list">
            {tasks.length === 0 ? (
              <li style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No tasks found. Add a task above to get started!
              </li>
            ) : (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? 'completed' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '15px' }}>{task.text}</span>
                  </div>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}