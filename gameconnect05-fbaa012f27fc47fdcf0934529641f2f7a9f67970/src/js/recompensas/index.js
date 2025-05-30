async function getRewards() {
    try {
        const response = await fetch('https://6831c46b6205ab0d6c3d8b6c.mockapi.io/api/v1/recompensas');
        const data = await response.json();
        return data.rewards || [];
    } catch (error) {
        console.error('Error loading rewards:', error.message);
        return [];
    }
}

async function renderRewards() {
    const rewards = await getRewards();
    const container = document.getElementById('rewardsContainer');
    if (!container) return console.error('Container for rewards not found');

    if (rewards.length === 0) {
        container.innerHTML = `<p>No rewards found.</p>`;
        return;
    }

    container.innerHTML = rewards.map(reward => `
        <div class="bg-green-100 p-4 rounded-lg shadow mb-4">
            <h5 class="text-xl font-semibold">${reward.name}</h5>
            <p class="text-gray-700">${reward.description}</p>
            ${reward.points ? `<p class="text-sm text-gray-600">Puntos: ${reward.points}</p>` : ''}
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', renderRewards);
