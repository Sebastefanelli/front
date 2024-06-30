document.addEventListener('DOMContentLoaded', function() {
  const app = document.getElementById('app');
  const backendUrl = 'https://empathetic-charm-production.up.railway.app';  // URL de tu backend en Railway

  // Obtener la lista de archivos desde el backend
  fetch(`${backendUrl}/api/files`)
    .then(response => response.json())
    .then(data => {
      const list = document.createElement('ul');
      data.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file;
        list.appendChild(listItem);
      });
      app.appendChild(list);
    });

  // Formulario para subir archivos al backend
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="file" id="fileInput">
    <input type="text" id="folderInput" placeholder="Carpeta (opcional)">
    <button type="submit">Subir</button>
  `;
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const folderInput = document.getElementById('folderInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('folder', folderInput.value);

    fetch(`${backendUrl}/api/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')  // Asegúrate de manejar la autorización según tus necesidades
      },
      body: formData
    })
    .then(response => response.text())
    .then(result => alert(result))
    .catch(error => console.error('Error:', error));
  });

  app.appendChild(form);
});
