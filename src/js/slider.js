document.addEventListener("DOMContentLoaded", () => {
    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');

    let slider = document.querySelector('.slider');
    let sliderList = slider.querySelector('.slider .list');
    let thumbnail = document.querySelector('.slider .thumbnail');
    let thumbnailItems = thumbnail.querySelectorAll('.item');

    // Asegurarse de que haya miniaturas antes de intentar mover la primera
    if (thumbnailItems.length > 0) {
        thumbnail.appendChild(thumbnailItems[0]);
    }

    // Función para el botón siguiente
    nextBtn.onclick = function() {
        moveSlider('next');
    };

    // Función para el botón anterior
    prevBtn.onclick = function() {
        moveSlider('prev');
    };

    function moveSlider(direction) {
        let sliderItems = sliderList.querySelectorAll('.item');
        let thumbnailItems = document.querySelectorAll('.thumbnail .item');
        
        if(direction === 'next'){
            sliderList.appendChild(sliderItems[0]);
            thumbnail.appendChild(thumbnailItems[0]);
            slider.classList.add('next');
        } else {
            sliderList.prepend(sliderItems[sliderItems.length - 1]);
            thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
            slider.classList.add('prev');
        }

        slider.addEventListener('animationend', function() {
            if(direction === 'next'){
                slider.classList.remove('next');
            } else {
                slider.classList.remove('prev');
            }
        }, {once: true}); // Eliminar el listener después de una ejecución
    }

    // --- INTEGRACIÓN DEL MODAL DE DETALLES PARA EL SLIDER ---
    // Escuchar clics en el contenedor de la lista del slider
    sliderList.addEventListener('click', (event) => {
        // Usa closest para encontrar el botón '.btn-slider-ver-mas' que fue clicado
        // o su ancestro si el click fue en un elemento hijo del botón
        const targetButton = event.target.closest('.btn-slider-ver-mas');
        
        if (targetButton) {
            const gameId = parseInt(targetButton.dataset.id);
            
            // Llama a la función global openGameDetailModal definida en catalogo/index.js
            if (typeof window.openGameDetailModal === 'function') {
                window.openGameDetailModal(gameId);
            } else {
                console.error('Error: La función openGameDetailModal no está definida o no es accesible.');
            }
        }
    });
});