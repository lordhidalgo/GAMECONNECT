document.addEventListener('DOMContentLoaded', () => {
  
  async function getRewards() {
      try {
          const response = await fetch('data.json');
          const data = await response.json();
          return data || [];
      } catch (error) {
          console.error('Error loading rewards:', error.message);
          return [];
      }
  }

  async function renderRewards() {
      const rewards = await getRewards();
      const container = document.getElementById('rewards-section');
      if (!container) return console.error('Container for rewards not found');

      if (rewards.length === 0) {
          container.innerHTML = `<p>No rewards found.</p>`;
          return;
      }

      container.innerHTML = rewards.map(reward => `
          <div class="bg-green-100 p-4 rounded-lg shadow mb-4">
              <h5 class="text-xl font-semibold">${reward.titulo}</h5>
              <p class="text-gray-700">${reward.descripcion}</p>
              ${reward.puntos ? `<p class="text-sm text-gray-600">Puntos: ${reward.puntos}</p>` : ''}
          </div>
      `).join('');
  }

  renderRewards();

});