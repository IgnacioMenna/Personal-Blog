// main.js
document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('boton');
    
    if (boton) {
      boton.addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const content = document.getElementById('content').value;
  
        if (title && date && content) {
          const articles = JSON.parse(localStorage.getItem('articles')) || [];
  
          const id = Date.now(); // Use timestamp as a unique ID
          articles.push({ id, title, date, content });
          localStorage.setItem('articles', JSON.stringify(articles));     

          // Luego de guardar, redirigir al admin
          window.location.href = '/admin.html';
        } else {
          alert('Please fill all the camps.');
        }
      });
    }
  
    // Si estamos en admin.html, cargamos los artículos
    if (window.location.pathname.endsWith('admin.html')) {
      const container = document.getElementById('app');
      const articles = JSON.parse(localStorage.getItem('articles')) || [];
  
      articles.forEach((article1) => {
        const div = document.createElement('div');
        div.className = 'sec';
        div.innerHTML = `
          <a href=/article3.html?id=${article1.id} class="cards">${article1.title}</a>
          <div class="actions">
            <a href="/edit.html?id=${article1.id}" class="edit-btn">Edit</a>
            <button class="delete-btn" data-index="${article1.id}">Delete</button>
          </div>
        `;
        container.appendChild(div);
      });
  
      // Eliminar artículo
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-index');
          const newArticles = articles.filter(article => article.id != id);
          localStorage.setItem('articles', JSON.stringify(newArticles));
          location.reload();
        });
      });
    }else if(window.location.pathname.endsWith('edit.html')){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const articles = JSON.parse(localStorage.getItem('articles')) || [];
      const article = articles.find(article => article.id == id);
  
      if (article) {
        document.getElementById('title').value = article.title;
        document.getElementById('date').value = article.date;
        document.getElementById('content').value = article.content;
  
        const boton = document.getElementById('boton');
        boton.addEventListener('click', () => {
          article.title = document.getElementById('title').value;
          article.date = document.getElementById('date').value;
          article.content = document.getElementById('content').value;
  
          localStorage.setItem('articles', JSON.stringify(articles));
          window.location.href = '/admin.html';
        });
      }
    }else if(window.location.pathname === '/' || window.location.pathname === '/index.html'){
      const articles = JSON.parse(localStorage.getItem('articles')) || [];
      const container = document.getElementById('app');
      articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'sec';
        div.innerHTML = `
          <a href="/article3.html?id=${article.id}" class="cards">${article.title}</a>
          <h2>${article.date}</h2>
        `;
        container.appendChild(div);
      });
    }else if(window.location.pathname === '/article3.html'){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const articles = JSON.parse(localStorage.getItem('articles')) || [];  
      const article = articles.find(article => article.id == id);
      const container = document.getElementById('app');
  
      if (article) {
        const div = document.createElement('div');

        div.innerHTML = `
          <div id="prim">
            <h1>${article.title}</h1>
          </div>
          <div>
            <h2>${article.date}</h2>
          </div>

          <div class="parr">
            <p>
            ${article.content}
            </p>
          </div>
          `;
        container.appendChild(div);
      }else {
        container.innerHTML = '<p>Not found.</p>';
      }
    }
  });
      