import { load, save, uid } from '../store.js';

const KEY = 'daybook.todos';

export function renderTodo(root) {
  let todos = load(KEY, []);
  let filter = 'all';

  root.innerHTML = `
    <section class="view">
      <h1>To-Do</h1>
      <form class="card add-row">
        <input name="text" placeholder="Add a task…" autocomplete="off" required />
        <button type="submit">Add</button>
      </form>
      <div class="toolbar">
        <div class="filters">
          <button data-f="all" class="chip active">All</button>
          <button data-f="open" class="chip">Open</button>
          <button data-f="done" class="chip">Done</button>
        </div>
        <span class="count"></span>
      </div>
      <ul class="todos"></ul>
    </section>
  `;

  const form = root.querySelector('form');
  const list = root.querySelector('.todos');
  const count = root.querySelector('.count');

  const persist = () => { save(KEY, todos); draw(); };

  function draw() {
    const open = todos.filter((t) => !t.done).length;
    count.textContent = `${open} open`;

    const shown = todos.filter((t) =>
      filter === 'all' ? true : filter === 'done' ? t.done : !t.done
    );

    if (!shown.length) {
      list.innerHTML = `<li class="empty">${todos.length ? 'Nothing here.' : 'No tasks yet.'}</li>`;
      return;
    }

    list.replaceChildren(
      ...shown.map((t) => {
        const li = document.createElement('li');
        li.className = 'card todo' + (t.done ? ' done' : '');
        li.innerHTML = `
          <label>
            <input type="checkbox" ${t.done ? 'checked' : ''} />
            <span></span>
          </label>
          <button class="icon" title="Delete task" aria-label="Delete task">✕</button>
        `;
        li.querySelector('span').textContent = t.text;
        li.querySelector('input').onchange = () => { t.done = !t.done; persist(); };
        li.querySelector('button').onclick = () => {
          todos = todos.filter((x) => x.id !== t.id);
          persist();
        };
        return li;
      })
    );
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const text = new FormData(form).get('text').trim();
    if (!text) return;
    todos.unshift({ id: uid(), text, done: false });
    form.reset();
    persist();
  };

  root.querySelectorAll('.chip').forEach((b) => {
    b.onclick = () => {
      filter = b.dataset.f;
      root.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === b));
      draw();
    };
  });

  draw();
}
