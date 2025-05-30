async function getCatalogItems() {
    try {
        const response = await fetch('https://6831c46b6205ab0d6c3d8b6c.mockapi.io/api/v1/catalogo');
        const data = await response.json();
        return data.catalog || [];
    } catch (error) {
        console.error('Error loading catalog:', error.message);
        return [];
    }
}

async function renderCatalog() {
    const items = await getCatalogItems();
    const container = document.getElementById('catalogContainer');
    if (!container) return console.error('Container for catalog not found');

    if (items.length === 0) {
        container.innerHTML = `<p>No catalog items found.</p>`;
        return;
    }

    container.innerHTML = items.map(item => `
        <div class="bg-white rounded-lg shadow-md p-4 mb-4">
            <img src="${item.image}" alt="${item.name}" class="w-full h-40 object-cover rounded mb-2"/>
            <h4 class="text-lg font-bold">${item.name}</h4>
            <p class="text-gray-600">${item.description}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderCatalog);
