// /src/js/recompensas/index.js (o la ruta donde tengas este código)
document.addEventListener("DOMContentLoaded", async () => {
    const rewardsContainer = document.querySelector('.rewards-grid');
    
    if (!rewardsContainer) {
        console.warn("No se encontró el contenedor de recompensas. Asegúrate de que el elemento con la clase '.rewards-grid' exista en tu HTML.");
        return; // Sale de la función si el contenedor no se encuentra
    }

    try {
        // --- CAMBIO CLAVE AQUÍ: RUTA ABSOLUTA DESDE LA RAÍZ DEL SERVIDOR ---
        const response = await fetch('/datarewards.json'); // ¡Ruta corregida!

        // --- MANEJO DE ERRORES MEJORADO: Verificar si la respuesta HTTP es exitosa ---
        if (!response.ok) { 
            throw new Error(`Error HTTP! Estado: ${response.status} - No se pudo cargar el archivo datarewards.json.`);
        }

        const rewards = await response.json();

        if (!rewards.length) {
            rewardsContainer.innerHTML = "<p>No se encontraron recompensas en este momento.</p>";
            return;
        }

        rewardsContainer.innerHTML = rewards.map(reward => `
            <div class="reward-item aos-init aos-animate p-4 bg-white shadow-md rounded-lg" data-aos="fade-up">
                <h3 class="text-lg font-bold text-orange-600">${reward.titulo}</h3>
                <p class="text-sm text-gray-700 mt-2">${reward.descripcion}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error al cargar las recompensas:", error);
        // Mostrar un mensaje de error más específico al usuario si es necesario
        rewardsContainer.innerHTML = "<p class='error-message'>¡Lo sentimos! No se pudieron cargar las recompensas en este momento. Por favor, inténtalo de nuevo más tarde.</p>";
    }
});