document.getElementById('support-form').addEventListener('submit', function (e) {
  e.preventDefault(); // evita que se recargue la página

  const nombre = document.getElementById('nombreUsuario').value.trim();
  const queja = document.getElementById('textoQueja').value.trim();
  const archivo = document.getElementById('cargarArchivo').files[0];

  if (!nombre || !queja) {
    alert("Por favor, completa todos los campos requeridos.");
    return;
  }

  // Simulación del procesamiento del formulario
  console.log("Formulario de Soporte Enviado:");
  console.log("Nombre:", nombre);
  console.log("Queja:", queja);
  if (archivo) {
    console.log("Archivo subido:", archivo.name);
  }

  alert("¡Gracias por contactarnos! Tu solicitud de soporte ha sido recibida.");

  // Resetear el formulario
  this.reset();
});
