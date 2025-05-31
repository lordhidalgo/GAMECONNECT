document.addEventListener("DOMContentLoaded", async () => {
    const rewardsContainer = document.querySelector('.rewards-grid');
    
    if (!rewardsContainer) {
        console.warn("No se encontró el contenedor de recompensas.");
        return;
    }

    try {
        const response = await fetch('datarewards.json');
        const rewards = await response.json();

        if (!rewards.length) {
            rewardsContainer.innerHTML = "<p>No se encontraron recompensas.</p>";
            return;
        }

        rewardsContainer.innerHTML = rewards.map(reward => `
            <div class="recompensa-card aos-init aos-animate p-4 bg-white shadow-md rounded-lg" data-aos="fade-up">
                <h3 class="text-lg font-bold text-orange-600">${reward.titulo}</h3>
                <p class="text-sm text-gray-700 mt-2">${reward.descripcion}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error al cargar las recompensas:", error);
        rewardsContainer.innerHTML = "<p>Error al cargar las recompensas.</p>";
    }
});
