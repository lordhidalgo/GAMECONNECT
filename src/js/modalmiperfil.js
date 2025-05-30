document.addEventListener('DOMContentLoaded', function() {
    // Obtener el modal
    var modal = document.getElementById('miPerfilModal');

    // Obtener el botón que abre el modal
    var btn = document.getElementById('miPerfilBtn');

    // Obtener el elemento <span> que cierra el modal
    var span = document.getElementsByClassName('close')[0];

    // Cuando el usuario hace clic en el botón, abre el modal
    if (btn) {
        btn.onclick = function() {
            if (modal) {
                modal.style.display = 'block';
            } else {
                console.error('No se encontró el modal.');
            }
        };
    } else {
        console.error('No se encontró el botón "Mi perfil".');
    }

    // Cuando el usuario hace clic en <span> (x), cierra el modal
    if (span) {
        span.onclick = function() {
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error('No se encontró el modal.');
            }
        };
    } else {
        console.error('No se encontró el elemento para cerrar el modal.');
    }

    // Cuando el usuario hace clic fuera del modal, ciérralo
    window.onclick = function(event) {
        if (modal && event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Manejar el envío del formulario
    var perfilForm = document.getElementById('perfilForm');
    if (perfilForm) {
        perfilForm.onsubmit = function(event) {
            event.preventDefault();

            // Recolectar los datos del formulario
            var formData = {
                nombreCompleto: document.getElementById('nombreCompleto').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                metodosPago: document.getElementById('metodosPago').value,
                subscripcion: document.getElementById('subscripcion').checked
            };

            // Mostrar los datos en la consola
            console.log('Datos del formulario:', formData);

            // Aquí puedes añadir la lógica para guardar los cambios
            alert('Cambios guardados');
            if (modal) {
                modal.style.display = 'none';
            } else {
                console.error('No se encontró el modal.');
            }
        };
    } else {
        console.error('No se encontró el formulario de perfil.');
    }

    // Manejar la eliminación de la cuenta
    var eliminarCuentaBtn = document.getElementById('eliminarCuentaBtn');
    if (eliminarCuentaBtn) {
        eliminarCuentaBtn.onclick = function() {
            if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
                // Aquí puedes añadir la lógica para eliminar la cuenta
                alert('Cuenta eliminada');
                if (modal) {
                    modal.style.display = 'none';
                } else {
                    console.error('No se encontró el modal.');
                }
            }
        };
    } else {
        console.error('No se encontró el botón para eliminar la cuenta.');
    }
});
