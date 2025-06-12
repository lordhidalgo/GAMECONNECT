// Carrito de compras
let carrito = [];

// Mostrar el modal del carrito
function mostrarCarrito() {
    document.getElementById('cart-modal').style.display = 'flex';
    renderizarCarrito();
}

// Cerrar el modal del carrito
function cerrarCarrito() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({
            nombre,
            precio,
            cantidad: 1
        });
    }
    renderizarCarrito();
    showToastNotification(`"${nombre}" añadido al carrito.`);
}

// Eliminar un producto del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    renderizarCarrito();
    showToastNotification(`"${nombre}" eliminado del carrito.`);
}

// Actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = total;
}

// Renderizar los productos del carrito en el modal
function renderizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItems.innerHTML = '';

    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center;color:var(--text-muted);">El carrito está vacío.</p>';
        totalAmount.textContent = '0.00';
        return;
    }

    carrito.forEach(item => {
        // Si el precio es "GRATIS", no sumar al total
        let precioNum = item.precio === 'GRATIS' ? 0 : parseFloat(item.precio.replace(/\./g, '').replace(',', '.'));
        total += precioNum * item.cantidad;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span class="cart-item-title">${item.nombre}</span>
            <span class="cart-item-price">${item.precio}${item.cantidad > 1 ? ' x' + item.cantidad : ''}</span>
            <button class="cart-item-remove" onclick="eliminarDelCarrito('${item.nombre}')">&times;</button>
        `;
        cartItems.appendChild(div);
    });

    totalAmount.textContent = total === 0 ? '0.00' : total.toLocaleString('es-CO');
    actualizarContadorCarrito();
}

// Finalizar compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    alert('¡Gracias por tu compra!');
    carrito = [];
    renderizarCarrito();
    cerrarCarrito();
}

// Permitir abrir el carrito desde cualquier parte (ejemplo: botón en header)
document.addEventListener('DOMContentLoaded', () => {
    // Si tienes un botón para abrir el carrito, dale el id "btn-ver-carrito"
    const btnVerCarrito = document.getElementById('btn-ver-carrito');
    if (btnVerCarrito) {
        btnVerCarrito.addEventListener('click', mostrarCarrito);
    }

    // Cerrar modal al hacer click fuera del contenido
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.addEventListener('click', (event) => {
            if (event.target === cartModal) {
                cerrarCarrito();
            }
        });
    }

    // Cerrar modal con Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && cartModal.style.display === 'flex') {
            cerrarCarrito();
        }
    });

    actualizarContadorCarrito();
});

// Para que las funciones estén disponibles globalmente
window.agregarAlCarrito = agregarAlCarrito;
window.cerrarCarrito = cerrarCarrito;
window.finalizarCompra = finalizarCompra;
window.eliminarDelCarrito = eliminarDelCarrito;

// Función para mostrar notificaciones tipo toast
function showToastNotification(message, duration = 3000) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
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