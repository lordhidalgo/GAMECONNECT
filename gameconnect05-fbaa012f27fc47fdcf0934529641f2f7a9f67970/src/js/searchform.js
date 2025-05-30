document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que la página se recargue al hacer submit

  const searchTerm = document.getElementById('search-bar').value.trim();

  if (searchTerm === "") {
    alert("Por favor ingresa un término de búsqueda.");
    return;
  }

  // Simulación de la búsqueda
  console.log("Buscando juegos relacionados con:", searchTerm);

  // Mostrar un mensaje de éxito (puedes modificar esto para mostrar resultados reales)
  alert("Resultados para: " + searchTerm);
  
  // Reseteamos el formulario después de la búsqueda
  this.reset();
});