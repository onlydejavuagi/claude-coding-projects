import './style.css';
import { renderJournal } from './views/journal.js';
import { renderTodo } from './views/todo.js';

const routes = {
  journal: renderJournal,
  todo: renderTodo,
};

const app = document.getElementById('app');

function router() {
  const name = location.hash.replace('#/', '') || 'journal';
  const render = routes[name] ?? routes.journal;

  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === name);
  });

  app.replaceChildren();
  render(app);
}

window.addEventListener('hashchange', router);
router();
