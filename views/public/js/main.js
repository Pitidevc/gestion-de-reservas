document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('Contraseña');
    const eyeIcon = document.getElementById('eyeIcon');

    toggleBtn.addEventListener('click', () => {
        // Alternar el tipo de input
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Cambiar el icono dinámicamente
        if (type === 'text') {
            // Icono de Ojo Tachado (Eye Off)
            eyeIcon.innerHTML = `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`;
        } else {
            // Icono de Ojo Normal
            eyeIcon.innerHTML = `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
        }
    });
});


document.getElementById('Ingresar').addEventListener('click', async() =>{
    const usuario = document.getElementById('Usuario').value;
    const contraseña = document.getElementById('Contraseña').value;
    const rol = document.getElementById('Rol').value;

    if(!usuario || !contraseña) {
        return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Rellena todos los campos",
            });
    }

    try {
        
        const respuesta = await fetch('/api/reserva/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({usuario, contraseña, rol})});
        const resultado = await respuesta.json();

        if(resultado.ok){
            window.location.href = resultado.url;
        } else {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: resultado.mensaje,
            });
        };

    } catch (error) {
        
    }
});