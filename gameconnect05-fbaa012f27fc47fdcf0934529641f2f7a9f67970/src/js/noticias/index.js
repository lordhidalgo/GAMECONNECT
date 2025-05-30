async function getNewsletters() {
    try {
        const response = await fetch('https://6831c46b6205ab0d6c3d8b6c.mockapi.io/api/v1/catalogo');
        const data = await response.json();
        return data.newsletters || [];
    } catch (error) {
        console.error('Error loading newsletters:', error.message);
        return [];
    }
}

async function renderNewsletters() {
    const articles = await getNewsletters();
    const container = document.getElementById('articlesList');
    if (!container) return console.error('Container for newsletters not found');

    if (articles.length === 0) {
        container.innerHTML = `<p>No articles found.</p>`;
        return;
    }

    container.innerHTML = articles.map(article => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div class="p-6">
                ${article.image ? `
                    <img src="${article.image}" alt="${article.name}" class="w-full h-48 object-cover rounded-lg shadow-sm mb-4"/>
                ` : ''}
                <h2 class="text-2xl font-bold text-gray-800 mb-2">${article.name}</h2>
                <p class="text-gray-600 mb-4">${article.description}</p>
                ${article.frequency ? `<p class="text-sm text-gray-500">Frecuencia: ${article.frequency}</p>` : ''}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderNewsletters);
