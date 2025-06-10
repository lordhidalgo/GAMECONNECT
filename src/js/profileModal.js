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
                const data = JSON.parse(localStorage.getItem('perfilUsuario'));
                if (data) {
                    document.getElementById('nombreCompleto').value = data.nombreCompleto || '';
                    document.getElementById('correo').value = data.correo || '';
                    document.getElementById('telefono').value = data.telefono || '';
                    document.getElementById('direccion').value = data.direccion || '';
                    document.getElementById('metodosPago').value = data.metodosPago || '';
                    document.getElementById('subscripcion').checked = !!data.subscripcion;
                }
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
            var formData = {
                nombreCompleto: document.getElementById('nombreCompleto').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                metodosPago: document.getElementById('metodosPago').value,
                subscripcion: document.getElementById('subscripcion').checked
            };
            localStorage.setItem('perfilUsuario', JSON.stringify(formData));
            alert('Cambios guardados');
            if (modal) modal.style.display = 'none';
        };
    } else {
        console.error('No se encontró el formulario de perfil.');
    }

    // Manejar la eliminación de la cuenta
    var eliminarCuentaBtn = document.getElementById('eliminarCuentaBtn');
    if (eliminarCuentaBtn) {
        eliminarCuentaBtn.onclick = function() {
            if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
                localStorage.removeItem('perfilUsuario');
                alert('Cuenta eliminada');
                if (modal) modal.style.display = 'none';
            }
        };
    } else {
        console.error('No se encontró el botón para eliminar la cuenta.');
    }
});
