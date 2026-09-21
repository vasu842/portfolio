// Task Data
let tasks = [
  { id: 1, text: 'Review quarterly performance report', completed: true },
  { id: 2, text: 'Design new landing page mockups', completed: false },
  { id: 3, text: 'Setup client onboarding call', completed: false }
];

let darkMode = false;

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

// Initialize Dashboard
function render() {
  // Update Metrics
  totalTasksEl.textContent = tasks.length;
  completedTasksEl.textContent = tasks.filter(t => t.completed).length;
  pendingTasksEl.textContent = tasks.filter(t => !t.completed).length;

  // Clear Task List UI
  taskList.innerHTML = '';

  // Render Tasks
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" class="toggle-checkbox">
        <span>${escapeHTML(task.text)}</span>
      </div>
      <button class="btn-delete" data-id="${task.id}">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    taskList.appendChild(li);
  });
}

// Helper: Escape HTML string to prevent injection
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Add New Task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({ id: Date.now(), text, completed: false });
  taskInput.value = '';
  render();
});

// Event Delegation for Complete / Delete
taskList.addEventListener('click', (e) => {
  const target = e.target.closest('.btn-delete') || e.target;
  const id = Number(target.getAttribute('data-id'));

  if (target.classList.contains('btn-delete') || target.closest('.btn-delete')) {
    const deleteId = Number(target.getAttribute('data-id') || target.closest('.btn-delete').getAttribute('data-id'));
    tasks = tasks.filter(t => t.id !== deleteId);
    render();
  } else if (target.classList.contains('toggle-checkbox')) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    render();
  }
});

// Dark Mode Toggle
themeToggleBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  if (darkMode) {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fa-solid fa-sun';
    themeText.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.className = 'fa-solid fa-moon';
    themeText.textContent = 'Dark Mode';
  }
});

// Initial Render
render();   