   document.addEventListener("DOMContentLoaded", async () => {
        const container = document.querySelector('.catalogo-grid');
        try {
            const response = await fetch('data.json');
            const items = await response.json();

            container.innerHTML = items.map(item => `
                <div class="juego-card aos-init aos-animate" data-aos="fade-up">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h3>${item.nombre}</h3>
                    <p>Género: ${item.genero}</p>
                    <p class="precio">${item.precio > 0 ? `$${item.precio.toLocaleString()}` : 'GRATIS'}</p>
                    <button class="btn-agregar-carrito"
                        data-id="${item.id}"
                        data-nombre="${item.nombre}"
                        data-precio="${item.precio}">
                        Agregar al carrito
                    </button>
                    <button class="btn-ver-detalles" data-id="${item.id}">
                        Ver detalles
                    </button>
                    <p class="text-gray-600">${item.descripcion}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error cargando el catálogo:', error.message);
            container.innerHTML = `<p>No se pudo cargar el catálogo.</p>`;
        }
    });