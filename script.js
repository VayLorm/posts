document.addEventListener('DOMContentLoaded', loadArticles);

const articles = [
        { title: "Значение здорового питания", fileName: "articles/article1.html" },
        { title: "Польза физической активности", fileName: "articles/article2.html" },
        { title: "Технологии и их влияние на общество", fileName: "articles/article3.html" },
        { title: "Экологические проблемы современности", fileName: "articles/article4.html" },
        { title: "Психология счастья", fileName: "articles/article5.html" }
];

function loadArticles() {
    const articlesContainer = document.getElementById('articlesContainer');
    
    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `<h2>${article.title}</h2><p>Нажмите для чтения...</p>`;
        
        // Добавление обработчика события для открытия полной статьи
        articleElement.addEventListener('click', () => openArticle(article.fileName));
        
        articlesContainer.appendChild(articleElement);
    });
}

function openArticle(fileName) {
    fetch(fileName)
        .then(response => response.text())
        .then(html => {
            const modal = document.getElementById('articleModal');
            document.getElementById('modalTitle').innerText = fileName.replace('.html', '').replace(/_/g, ' ');
            document.getElementById('modalContent').innerHTML = html;

            modal.style.display = "block"; // Показать модальное окно
        })
        .catch(error => console.error('Ошибка загрузки статьи:', error));
}

// Закрытие модального окна
document.querySelector('.close').addEventListener('click', () => {
   document.getElementById('articleModal').style.display = "none";
});

// Закрытие модального окна при клике вне его области
window.onclick = function(event) {
   const modal = document.getElementById('articleModal');
   if (event.target === modal) {
       modal.style.display = "none";
   }
}