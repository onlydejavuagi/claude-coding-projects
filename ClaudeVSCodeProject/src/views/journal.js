import { load, save, uid } from '../store.js';

const KEY = 'daybook.journal';

const fmtDate = (ts) =>
  new Date(ts).toLocaleDateString(undefined, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });

export function renderJournal(root) {
  let entries = load(KEY, []);

  root.innerHTML = `
    <section class="view">
      <h1>Journal</h1>
      <form class="card composer">
        <input name="title" placeholder="Title (optional)" autocomplete="off" />
        <textarea name="body" rows="5" placeholder="What's on your mind today?" required></textarea>
        <div class="row-end"><button type="submit">Save entry</button></div>
      </form>
      <ul class="entries"></ul>
    </section>
  `;

  const form = root.querySelector('form');
  const list = root.querySelector('.entries');

  function draw() {
    if (!entries.length) {
      list.innerHTML = `<li class="empty">No entries yet. Write your first one above.</li>`;
      return;
    }
    list.replaceChildren(
      ...entries.map((e) => {
        const li = document.createElement('li');
        li.className = 'card entry';
        li.innerHTML = `
          <div class="entry-head">
            <div>
              <h3></h3>
              <time>${fmtDate(e.createdAt)}</time>
            </div>
            <button class="icon" title="Delete entry" aria-label="Delete entry">✕</button>
          </div>
          <p></p>
        `;
        li.querySelector('h3').textContent = e.title || 'Untitled';
        li.querySelector('p').textContent = e.body;
        li.querySelector('button').onclick = () => {
          entries = entries.filter((x) => x.id !== e.id);
          save(KEY, entries);
          draw();
        };
        return li;
      })
    );
  }

  form.onsubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData(form);
    const body = data.get('body').trim();
    if (!body) return;
    entries.unshift({ id: uid(), title: data.get('title').trim(), body, createdAt: Date.now() });
    save(KEY, entries);
    form.reset();
    draw();
  };

  draw();
}
