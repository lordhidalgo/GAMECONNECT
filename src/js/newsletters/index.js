// src/js/noticias/index.js
let allNews = []; // Para almacenar los datos de todas las noticias

// Referencias a los elementos del modal de noticias
const newsDetailModal = document.getElementById('news-detail-modal');
const closeNewsModalBtn = document.querySelector('.close-news-modal');
const modalNewsImage = document.getElementById('modal-news-image');
const modalNewsTitle = document.getElementById('modal-news-title');
const modalNewsFullContent = document.getElementById('modal-news-full-content');

// Función para abrir el modal de noticias y cargar su información
function openNewsDetailModal(newsId) {
    const news = allNews.find(n => n.id === newsId); // Busca la noticia por su ID

    if (news) {
        modalNewsImage.src = news.imagen;
        modalNewsImage.alt = `Imagen de ${news.titulo}`;
        modalNewsTitle.textContent = news.titulo;
        // Usamos innerHTML porque contenidoCompleto puede contener etiquetas HTML (como <p>)
        modalNewsFullContent.innerHTML = news.contenidoCompleto; 

        newsDetailModal.style.display = 'flex'; // Muestra el modal
    } else {
        console.error('Noticia con ID ' + newsId + ' no encontrada en los datos de news.json.');
        alert('Lo sentimos, no se encontró información detallada para esta noticia.');
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.querySelector('.news-container'); // Contenedor de las tarjetas de noticias

    try {
        // Cargar las noticias desde el archivo local news.json
        const response = await fetch('/public/news.json');

        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status} - No se pudo cargar el archivo news.json.`);
        }

        allNews = await response.json(); // Almacena todas las noticias

        // --- Lógica para el modal de noticias ---

        // Delegación de eventos para los botones "Leer más"
        // Escuchamos los clics en el contenedor de noticias para detectar los botones
        if (newsContainer) {
            newsContainer.addEventListener('click', (event) => {
                const targetButton = event.target.closest('.btn-leer-mas-noticia');
                if (targetButton) {
                    const newsId = targetButton.dataset.id; // Obtiene el ID de la noticia del data-id
                    openNewsDetailModal(newsId); // Abre el modal con la noticia correspondiente
                }
            });
        }

        // Funcionalidad para cerrar el modal de noticias
        if (closeNewsModalBtn) {
            closeNewsModalBtn.addEventListener('click', () => {
                newsDetailModal.style.display = 'none';
            });
        }
        
        if (newsDetailModal) {
            // Cierra el modal si se hace clic fuera del contenido del modal
            window.addEventListener('click', (event) => {
                if (event.target === newsDetailModal) {
                    newsDetailModal.style.display = 'none';
                }
            });

            // Cierra el modal con la tecla Escape
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && newsDetailModal.style.display === 'flex') {
                    newsDetailModal.style.display = 'none';
                }
            });
        }

    } catch (error) {
        console.error('Error cargando las noticias o inicializando el modal:', error.message);
        // Si el contenedor existe, muestra un mensaje de error
        if (newsContainer) {
            newsContainer.innerHTML = `<p class="error-message">¡Error al cargar las noticias! Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }
});