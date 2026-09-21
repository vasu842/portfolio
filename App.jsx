// Initial State
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

// Render Function - Updates UI based on State
function render() {
  // 1. Update Metrics
  if (totalTasksEl) totalTasksEl.textContent = tasks.length;
  if (completedTasksEl) completedTasksEl.textContent = tasks.filter(t => t.completed).length;
  if (pendingTasksEl) pendingTasksEl.textContent = tasks.filter(t => !t.completed).length;

  // 2. Clear current task elements
  if (!taskList) return;
  taskList.innerHTML = '';

  // 3. Render Empty State or Tasks
  if (tasks.length === 0) {
    taskList.innerHTML = `<li style="text-align: center; color: var(--text-secondary); padding: 16px;">No tasks found. Add one above!</li>`;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}" class="toggle-checkbox">
        <span>${escapeHTML(task.text)}</span>
      </div>
      <button class="btn-delete" data-id="${task.id}" title="Delete Task">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;

    taskList.appendChild(li);
  });
}

// Utility: Prevent XSS script injection in user input
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Handle Form Submission (Add Task)
if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.unshift({ id: Date.now(), text, completed: false });
    taskInput.value = '';
    render();
  });
}

// Handle Task Actions (Complete / Delete) via Event Delegation
if (taskList) {
  taskList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.btn-delete');
    const checkbox = e.target.closest('.toggle-checkbox');

    if (deleteBtn) {
      const deleteId = Number(deleteBtn.getAttribute('data-id'));
      tasks = tasks.filter(t => t.id !== deleteId);
      render();
    } else if (checkbox) {
      const toggleId = Number(checkbox.getAttribute('data-id'));
      tasks = tasks.map(t => t.id === toggleId ? { ...t, completed: !t.completed } : t);
      render();
    }
  });
}

// Handle Dark/Light Mode Switch
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
      document.body.classList.add('dark-mode');
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      if (themeText) themeText.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-mode');
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      if (themeText) themeText.textContent = 'Dark Mode';
    }
  });
}

// Initial App Load
document.addEventListener('DOMContentLoaded', render);