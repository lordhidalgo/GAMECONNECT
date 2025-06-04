// /src/js/catalogo/index.js
document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector('.catalogo-grid');
    let allGames = []; // Para almacenar los datos de los juegos una vez cargados

    // Referencias a los elementos del modal de detalles
    const gameDetailModal = document.getElementById('game-detail-modal');
    const closeDetailModalBtn = document.querySelector('.close-detail-modal');
    const modalGameImage = document.getElementById('modal-game-image');
    const modalGameName = document.getElementById('modal-game-name');
    const modalGameGenre = document.getElementById('modal-game-genre');
    const modalGamePrice = document.getElementById('modal-game-price');
    const modalGameDescription = document.getElementById('modal-game-description');
    const addToCartModalBtn = document.getElementById('add-to-cart-modal-btn');

    try {
        const response = await fetch('/data.json'); // Esta ruta es correcta si data.json está en /public/

        // --- INICIO DEL SEGUNDO CAMBIO: VERIFICACIÓN DE RESPUESTA OK ---
        if (!response.ok) { // Importante: verificar si la respuesta es exitosa (código 200-299)
            throw new Error(`Error HTTP! Estado: ${response.status} - No se pudo cargar el archivo data.json.`);
        }
        // --- FIN DEL SEGUNDO CAMBIO ---

        allGames = await response.json(); // Almacena los datos de los juegos

        // Revisa si el contenedor existe antes de intentar modificar su innerHTML
        if (container) {
            container.innerHTML = allGames.map(item => `
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

        // --- Lógica del modal de detalles (MOVIDA AQUÍ) ---

        // Función para abrir el modal y cargar la información
        function openGameDetailModal(gameId) {
            const game = allGames.find(g => g.id === gameId); // Busca en los datos cargados de data.json

            if (game) {
                modalGameImage.src = game.imagen; // Usa item.imagen de data.json
                modalGameImage.alt = `Imagen de ${game.nombre}`;
                modalGameName.textContent = game.nombre;
                modalGameGenre.textContent = game.genero;
                modalGamePrice.textContent = game.precio === 0 ? 'GRATIS' : `$${game.precio.toLocaleString('es-CO')}`;
                modalGameDescription.textContent = game.descripcion;

                // Configurar el botón "Agregar al carrito" dentro del modal
                addToCartModalBtn.dataset.id = game.id;
                addToCartModalBtn.dataset.nombre = game.nombre;
                addToCartModalBtn.dataset.precio = game.precio;

                gameDetailModal.style.display = 'flex'; // Muestra el modal
            } else {
                console.error('Juego con ID ' + gameId + ' no encontrado en los datos de data.json.');
                alert('Lo sentimos, no se encontró información detallada para este juego.');
            }
        }

        // Escuchar clics en todos los botones "Ver detalles" DESPUÉS de que se hayan cargado
        const detailButtons = document.querySelectorAll('.btn-ver-detalles');
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const targetButton = event.target.closest('.btn-ver-detalles');
                if (targetButton) {
                    const gameId = parseInt(targetButton.dataset.id);
                    openGameDetailModal(gameId);
                }
            });
        });

        // Funcionalidad para cerrar el modal
        closeDetailModalBtn.addEventListener('click', () => {
            gameDetailModal.style.display = 'none';
        });

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

        // --- Fin de la lógica del modal ---

    } catch (error) {
        console.error('Error cargando el catálogo o inicializando el modal:', error.message);
        // Si el contenedor existe, muestra el mensaje de error allí.
        if (container) { // Asegurarse de que el contenedor exista antes de modificarlo
            container.innerHTML = `<p class="error-message">¡Error al cargar el catálogo! Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }
});