document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('support-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombreUsuario').value.trim();
    const correo = document.getElementById('correoUsuario').value.trim();
    const descripcion = document.getElementById('descripcionProblema').value.trim();

    if (!nombre || !correo || !descripcion) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    console.log("Formulario de Soporte Enviado:");
    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Descripción:", descripcion);

    alert("¡Gracias por contactarnos! Tu solicitud de soporte ha sido recibida.");

    this.reset();
  });
});
