const apiUrl = 'http://localhost:3001/entities';

document.addEventListener('DOMContentLoaded', () => {
  loadEntities();

  document.getElementById('entity-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('entityName').value;
    await createEntity({ name });
    document.getElementById('entityName').value = '';
    loadEntities();
  });
});

async function loadEntities() {
  const response = await fetch(apiUrl);
  const entities = await response.json();
  const list = document.getElementById('entity-list');
  list.innerHTML = '';
  entities.forEach(entity => {
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.textContent = entity.name;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', async () => {
      await deleteEntity(entity.id);
      loadEntities();
    });
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

async function createEntity(data) {
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function deleteEntity(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
}
