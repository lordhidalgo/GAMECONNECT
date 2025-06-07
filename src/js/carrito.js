document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('modal'); // Icono del carrito para abrir el modal (en juegos.html)
    const modal = document.getElementById('cart-modal'); // El modal del carrito
    const closeBtn = document.querySelector('#cart-modal .close'); // Botón de cerrar del modal (más específico)
    const cartItemsContainer = document.getElementById('cart-items'); // Contenedor de elementos del carrito
    const totalAmount = document.getElementById('total-amount'); // Elemento para mostrar el total
    // Nuevo: Elemento para el contador del icono del carrito
    const cartCountElement = document.getElementById('cartCount');


    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Cargar carrito desde localStorage

    // --- Funcionalidad del Modal del Carrito ---

    // Mostrar el modal del carrito al hacer clic en el icono
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            modal.classList.add('active'); // Cambiado para usar la clase 'active'
            updateCart();
        });
    }

    // Cerrar el modal del carrito al hacer clic en el botón 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active'); // Cambiado para usar la clase 'active'
        });
    }

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active'); // Cambiado para usar la clase 'active'
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active'); // Cambiado para usar la clase 'active'
        }
    });

    // --- Delegación de Eventos para 'Agregar al Carrito' y 'Eliminar' ---

    document.body.addEventListener('click', function(event) {
        // Manejar clics en botones 'Agregar al carrito'
        if (event.target.classList.contains('btn-agregar-carrito')) {
            const button = event.target;
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));

            // --- Lógica para manejar cantidades ---
            const existingItemIndex = cart.findIndex(item => item.id === id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
                cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * cart[existingItemIndex].precio;
                console.log(`Cantidad de "${nombre}" incrementada a ${cart[existingItemIndex].quantity}.`);
            } else {
                const item = { id, nombre, precio, quantity: 1, totalPrice: precio };
                cart.push(item);
                console.log("Elemento añadido al carrito:", item);
            }
            // --- Fin lógica para manejar cantidades ---

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();

            // Mostrar el mensaje de confirmación amigable
            showToastNotification(`"${nombre}" añadido al carrito.`);
        }

        // Manejar clics en botones 'Eliminar' (dentro del carrito)
        if (event.target.classList.contains('btn-eliminar')) {
            const idToRemove = event.target.getAttribute('data-id');
            const itemToRemoveName = cart.find(item => item.id === idToRemove)?.nombre;

            const originalLength = cart.length;
            cart = cart.filter(item => item.id !== idToRemove);

            if (cart.length < originalLength) {
                localStorage.setItem('cart', JSON.stringify(cart));
                console.log(`Elemento "${itemToRemoveName}" eliminado del carrito.`);
                updateCart();
                showToastNotification(`"${itemToRemoveName}" eliminado del carrito.`);
            } else {
                console.warn(`No se encontró el elemento con ID ${idToRemove} para eliminar.`);
            }
        }
    });

    // --- Funciones de Actualización y Lógica del Carrito ---

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItemsInCart = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">El carrito está vacío.</p>';
        } else {
            cart.forEach((item) => {
                item.quantity = item.quantity || 1;
                item.totalPrice = item.totalPrice || (item.precio * item.quantity);

                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <p>${item.nombre} x ${item.quantity} - $${item.totalPrice.toLocaleString('es-CO', {minimumFractionDigits: 0, maximumFractionDigits: 2})}</p>
                    <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.totalPrice;
                totalItemsInCart += item.quantity;
            });

            const buyButton = document.createElement('button');
            buyButton.className = 'btn-comprar';
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', function() {
                window.location.href = '/src/comprar.html';
            });
            cartItemsContainer.appendChild(buyButton);
        }

        totalAmount.textContent = total.toLocaleString('es-CO', {minimumFractionDigits: 0, maximumFractionDigits: 2});
        if (cartCountElement) {
            cartCountElement.textContent = totalItemsInCart;
        }
    }

    // --- Función para mostrar Notificaciones Toast (NUEVA) ---
    function showToastNotification(message, duration = 3000) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) {
            console.error('Toast container not found!');
            return;
        }

        const toast = document.createElement('div');
        toast.classList.add('toast-notification');
        toast.innerHTML = `<span class="toast-icon">&#10003;</span> ${message}`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => {
                toast.remove();
            }, { once: true });
        }, duration);
    }

    // Inicializar el carrito al cargar la página por primera vez
    updateCart();
});