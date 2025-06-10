// /src/js/catalogo/index.js
let allGames = [];

const gameDetailModal = document.getElementById('game-detail-modal');
const closeDetailModalBtn = document.querySelector('.close-detail-modal');
const modalGameImage = document.getElementById('modal-game-image');
const modalGameName = document.getElementById('modal-game-name');
const modalGameGenre = document.getElementById('modal-game-genre');
const modalGamePrice = document.getElementById('modal-game-price');
const modalGameDescription = document.getElementById('modal-game-description');
const addToCartModalBtn = document.getElementById('add-to-cart-modal-btn');


window.openGameDetailModal = function(gameId) {
    const game = allGames.find(g => g.id === gameId);

    if (game) {
        modalGameImage.src = game.modalImage || game.imagen;
        modalGameImage.alt = `Imagen de ${game.nombre}`;
        modalGameName.textContent = game.nombre;
        modalGameGenre.textContent = game.genero;
        modalGamePrice.textContent = game.precio === 0 ? 'GRATIS' : `$${game.precio.toLocaleString('es-CO')}`;
        modalGameDescription.textContent = game.descripcion;

        addToCartModalBtn.dataset.id = game.id;
        addToCartModalBtn.dataset.nombre = game.nombre;
        addToCartModalBtn.dataset.precio = game.precio;

        gameDetailModal.style.display = 'flex';
    } else {
        console.error('Juego con ID ' + gameId + ' no encontrado en los datos de data.json.');
        alert('Lo sentimos, no se encontró información detallada para este juego.');
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector('.catalogo-grid');
    
    try {
        const response = await fetch('/data.json');

        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status} - No se pudo cargar el archivo data.json.`);
        }

        allGames = await response.json();

        const catalogGames = allGames.filter(game => 
            game.displayLocations && game.displayLocations.includes("catalog")
        );

        if (container) {
            if (catalogGames.length === 0) {
                container.innerHTML = `<p class="info-message">No hay juegos disponibles en el catálogo en este momento.</p>`;
            } else {
                container.innerHTML = catalogGames.map(item => `
                    <div class="juego-card aos-init aos-animate" data-aos="fade-up">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <h3>${item.nombre}</h3>
                        <p>Género: ${item.genero}</p>
                        <p class="precio">${item.precio > 0 ? `$${item.precio.toLocaleString('es-CO')}` : 'GRATIS'}</p>
                        <button class="btn-agregar-carrito"
                            data-id="${item.id}"
                            data-nombre="${item.nombre}"
                            data-precio="${item.precio}">
                            Agregar al carrito
                        </button>
                        <button class="btn-ver-detalles" data-id="${item.id}">
                            Ver detalles
                        </button>
                    </div>
                `).join('');
            }
        }

        if (container) {
            container.addEventListener('click', (event) => {
                const targetButton = event.target.closest('.btn-ver-detalles');
                if (targetButton) {
                    const gameId = parseInt(targetButton.dataset.id);
                    openGameDetailModal(gameId);
                }
            });
        }

        if (closeDetailModalBtn) {
            closeDetailModalBtn.addEventListener('click', () => {
                gameDetailModal.style.display = 'none';
            });
        }
        
        if (gameDetailModal) {
            window.addEventListener('click', (event) => {
                if (event.target === gameDetailModal) {
                    gameDetailModal.style.display = 'none';
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && gameDetailModal.style.display === 'flex') {
                    gameDetailModal.style.display = 'none';
                }
            });
        }

    } catch (error) {
        console.error('Error cargando el catálogo o inicializando el modal:', error.message);
        if (container) {
            container.innerHTML = `<p class="error-message">¡Error al cargar el catálogo! Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }
});