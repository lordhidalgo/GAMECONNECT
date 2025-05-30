document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.getElementById('modal');
    const modal = document.getElementById('cart-modal');
    const closeBtn = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Mostrar el modal del carrito
    cartIcon.addEventListener('click', function() {
        modal.style.display = 'block';
        updateCart();
    });

    // Cerrar el modal del carrito
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Añadir elemento al carrito
    document.querySelectorAll('.btn-agregar-carrito').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const nombre = this.getAttribute('data-nombre');
            const precio = parseFloat(this.getAttribute('data-precio'));

            const item = { id, nombre, precio };
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));

            console.log("Elemento añadido al carrito:", item);
            updateCart();
        });
    });

    // Actualizar el contenido del carrito
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.nombre} - $${item.precio.toFixed(2)}</p>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.precio;
        });

        totalAmount.textContent = total.toFixed(2);

        // Añadir evento de clic a los botones "Eliminar"
        document.querySelectorAll('.btn-eliminar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const item = cart[index];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));

                console.log("Elemento eliminado del carrito:", item);
                updateCart();
            });
        });

        // Añadir botón "Comprar" si hay elementos en el carrito
        if (cart.length > 0) {
            const buyButton = document.createElement('button');
            buyButton.className = 'btn-comprar';
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', function() {
                // Redirigir a una página de pago o detalles del carrito
                window.location.href = '/src/comprar.html'; // Cambia esto a la URL de tu página de pago
            });
            cartItemsContainer.appendChild(buyButton);
        }
    }
});
