async function getSliderItems() {
    try {
        const response = await fetch('https://6831c46b6205ab0d6c3d8b6c.mockapi.io/api/v1/catalogo');
        const data = await response.json();
        return data.slider || [];
    } catch (error) {
        console.error('Error loading slider:', error.message);
        return [];
    }
}

async function renderSlider() {
    const items = await getSliderItems();
    const container = document.getElementById('sliderContainer');
    if (!container) return console.error('Container for slider not found');

    if (items.length === 0) {
        container.innerHTML = `<p>No slider items found.</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="slide bg-gray-100 rounded-lg shadow-md overflow-hidden mb-4">
            <img src="${item.image}" alt="${item.name}" class="w-full h-60 object-cover"/>
            <div class="p-4">
                <h3 class="text-xl font-semibold">${item.name}</h3>
                <p class="text-gray-600">${item.description}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderSlider);
