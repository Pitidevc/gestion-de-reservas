async function obtenerDatosUsuarioLimpieza() {
    try {
        
        const respuesta = await fetch('/api/reserva/obtener-user-limpieza', {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json'
            }
        });
        const resultado = await respuesta.json();

        if(resultado.ok){

            const userInfoDiv = document.getElementById('usuarioInfo');
            let claseverde = '';
            if(resultado.limpiador.estadoGeneral === 'activo'){
                 claseverde = 'text-emerald-500';
            }else if(resultado.limpiador.estadoGeneral === 'inactivo'){
                 claseverde = 'text-red-500'; 
            }
            userInfoDiv.innerHTML = `
                <span class="text-amber-50 font-medium">Limpiador: ${resultado.limpiador.nombre} ${resultado.limpiador.apellido}</span>
                <span class="${claseverde} text-sm">Estado: ${resultado.limpiador.estadoGeneral}</span>
            `;
        }

    } catch (error) {
        console.error("Error al obtener los datos del usuario de limpieza:", error);
    }
};

// Responsivo para celulares
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Función para abrir
    openBtn?.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    });

    // Función para cerrar
    const cerrarMenu = () => {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    };

    closeBtn?.addEventListener('click', cerrarMenu);
    overlay?.addEventListener('click', cerrarMenu);

    // CERRAR AUTOMÁTICAMENTE AL HACER CLICK EN UNA OPCIÓN
    document.querySelectorAll('aside button').forEach(btn => {
        btn.addEventListener('click', cerrarMenu);
    });

    obtenerDatosUsuarioLimpieza();
});

async function cargarLimpiezas() {
    
    try {
        
        const respuesta = await fetch('/api/reserva/limpiezas-pendientes', {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json'
            }
        });

        const resultado = await respuesta.json();

        if(resultado.ok && resultado.tareas.length > 0){
            const tablaLimpiezasPendientes = document.getElementById('tablaLimpiezasPendientes');
            let filasHTML = '';
            resultado.tareas.forEach(tarea => {
                filasHTML += `
                    <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        <td class="px-3 md:px-5 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${tarea.apartamento.numero}</td>
                        <td class="px-3 md:px-5 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${tarea.estado}</td>
                        <td class="px-3 md:px-5 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${new Date(tarea.creadoEn).toLocaleDateString()}</td>
                        <td class="px-3 md:px-5 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${new Date(tarea.creadoEn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td class="px-3 md:px-5 py-4 whitespace-nowrap">
                            <div class="flex justify-center items-center gap-1 md:gap-1.5">
                                <button value="${tarea._id}" class="btn-comenzar bg-emerald-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm rounded-lg hover:bg-emerald-600">Comenzar</button>
                                <button value="${tarea._id}" class="btn-retrasar bg-yellow-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm rounded-lg hover:bg-yellow-600">Retrasar</button>
                                <button value="${tarea._id}" class="btn-completar bg-blue-500 text-white px-2 md:px-3 py-1 text-xs md:text-sm rounded-lg hover:bg-blue-600">Completar</button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            tablaLimpiezasPendientes.innerHTML = filasHTML;

        }else if(resultado.ok && resultado.tareas.length === 0){
            tablaLimpiezasPendientes.innerHTML = '';
            swal.fire({
                icon: 'info',
                title: 'No hay tareas pendientes',
                text: resultado.mensaje,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#10B981'
            });
        }else{
                swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultado.error,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#EF4444'
                });
        } 
    } catch (error) {
        console.error("Error al obtener las tareas de limpieza:", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarLimpiezas();
    obtenerDatosUsuarioLimpieza();
});
document.getElementById('btnVerTareas').addEventListener('click', async () => {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <header class="mb-10 flex justify-between items-center">
            <div>
                <h2 class="text-3xl font-bold text-slate-800">Panel de Limpieza</h2>
                <p class="text-slate-500">Gestione el aseo y disponibilidad inmediata de los apartamentos.</p>
            </div>        
        </header>
        <div id="contenedorLimpiezas" class="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div class="overflow-x-auto -mx-8 -mb-8 px-8 pb-8">
                <table class="min-w-full border-collapse">
                    <thead>
                        <tr class="bg-slate-50 border-b-2 border-slate-300">
                            <th class="text-left px-3 md:px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Apartamento</th>
                            <th class="text-left px-3 md:px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Estado</th>
                            <th class="text-left px-3 md:px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Fecha</th>
                            <th class="text-left px-3 md:px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Hora</th>
                            <th class="text-center px-3 md:px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tablaLimpiezasPendientes" class="divide-y divide-slate-100">
                    </tbody>
                </table>
            </div>
        </div>
    `;
    cargarLimpiezas();
});

// Manejo de botones dentro de la tabla de limpiezas pendientes
// Escuchamos los clicks en TODA la tabla
document.getElementById('mainContent').addEventListener('click', async (event) => {
    
    const boton = event.target.closest('button');

    // 2. Si no se hizo clic en un botón, salimos
    if (!boton) return;    const tareaId = boton.value;
    let nuevoEstado = '';

    // Detectamos qué botón se presionó por su clase
    if (boton.classList.contains('btn-comenzar')) {
        nuevoEstado = 'en curso';
    } else if (boton.classList.contains('btn-retrasar')) {
        nuevoEstado = 'atrasado';
    } else if (boton.classList.contains('btn-completar')) {
        nuevoEstado = 'completado';
    } else {
        return; // Si clickeó en otra parte de la fila, no hacemos nada
    }

    // Ejecutamos la petición al servidor
    try {
        const respuesta = await fetch(`/api/reserva/cambiar-estado-limpieza`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tareaId, nuevoEstado })
        });
        
        const resultado = await respuesta.json();

        if (resultado.ok) {
            await swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: `La tarea ahora está: ${nuevoEstado}`,
                confirmButtonColor: '#10B981'
            });
            // Refrescamos la tabla para ver los cambios
            cargarLimpiezas();
        } else {
            // Aquí actuaría tu lógica de licencia si el error viene por falta de pago
            swal.fire({ icon: 'error', title: 'Error', text: resultado.error });
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    }
});


// Lógica de gestion de cuenta
document.getElementById('btnConfiguracion').addEventListener('click', async () => {
    const mainContent = document.getElementById('mainContent');

    try {
        const respuesta = await fetch('/api/reserva/usuario-actual');
        const resultado = await respuesta.json();

        if (resultado.ok) {
            const usuario = resultado.usuario.nombre;
            const contrasena = resultado.usuario.password;

            mainContent.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Configuración de la Cuenta</h2>
            <p class="text-slate-600">Aquí puedes actualizar la información de tu cuenta.</p>
            <div class="mt-6 max-w-lg mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-[0_22px_70px_4px_rgba(0,0,0,0.05)] border border-white/50">
                <h3 class="text-xl font-black text-slate-800 mb-4">Detalles de la Cuenta</h3>
                <div class="space-y-4">
                    <div class="space-y-1">
                        <label class="text-sm font-bold text-slate-500 uppercase tracking-widest">Usuario</label>
                        <input type="text" value="${usuario}" readonly
                            class="w-full bg-transparent border-none text-slate-800 font-bold px-2 outline-none cursor-default text-sm italic">
                    </div>
                    <div class="space-y-1">
                        
                        <button id="btnCambiarContrasena"
                            class="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-2 px-4 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                            <span>Cambiar Contraseña</span>
                            <i data-lucide="key" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>`;
            
            lucide.createIcons();

            // EVENTO CLICK CORREGIDO
            document.getElementById('btnCambiarContrasena').addEventListener('click', async () => {
                    const { value: formValues } = await Swal.fire({
                    title: 'Cambiar Contraseña',
                    html: `
                        <div class="relative w-full" style="text-align: left;">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                            <div style="position: relative;">
                                <input id="swal-input-password" type="password" class="swal2-input" 
                                    placeholder="Mínimo 4 caracteres" 
                                    style="width: 100%; margin: 0; padding-right: 40px;">
                                <button type="button" id="swal-toggle-password" 
                                        style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); 
                                            background: none; border: none; cursor: pointer; color: #64748b;">
                                    <svg id="swal-eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>
                    `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Actualizar',
                    confirmButtonColor: '#10B981',
                    cancelButtonColor: '#64748b',
                    didOpen: () => {
                        const input = document.getElementById('swal-input-password');
                        const toggleBtn = document.getElementById('swal-toggle-password');
                        const icon = document.getElementById('swal-eye-icon');

                        toggleBtn.addEventListener('click', () => {
                            const isPassword = input.type === 'password';
                            input.type = isPassword ? 'text' : 'password';
                            
                            // Cambiamos el icono según el tipo
                            icon.innerHTML = isPassword 
                                ? `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`
                                : `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
                        });
                    },
                    // Validación simple antes de cerrar el modal
                    preConfirm: () => {
                        const val = document.getElementById('swal-input-password').value;
                        if (!val) {
                            Swal.showValidationMessage('¡Debes escribir algo!');
                            return false;
                        }
                        if (val.length < 4) {
                            Swal.showValidationMessage('Mínimo 4 caracteres');
                            return false;
                        }
                        return val; // Esto se convierte en "nuevaContrasena"
                    }
                });

                // 2. Si el usuario ingresó un valor y confirmó
                if (formValues) {
                    const nuevaContrasena = formValues;
                    try {
                        // Mostramos un indicador de carga
                        Swal.fire({
                            title: 'Actualizando...',
                            didOpen: () => { Swal.showLoading(); },
                            allowOutsideClick: false
                        });

                        const respuestaEnvio = await fetch('/api/reserva/cambiar-contrasena', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ nuevaContrasena })
                        });

                        const resultadoEnvio = await respuestaEnvio.json();

                        if (resultadoEnvio.ok) {
                            await Swal.fire({
                                icon: 'success',
                                title: '¡Éxito!',
                                text: 'Contraseña actualizada correctamente.',
                                confirmButtonColor: '#10B981'
                            });
                            
                            // Recargamos la vista de configuración para refrescar los datos
                            document.getElementById('btnConfiguracion').click();
                        } else {
                            // Si el servidor rechaza (ej. por licencia vencida [2025-12-27])
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo cambiar',
                                text: resultadoEnvio.mensaje || 'Error de servidor',
                                confirmButtonColor: '#EF4444'
                            });
                        }
                    } catch (error) {
                        console.error('Error en el envío:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error de conexión',
                            text: 'No pudimos contactar con el servidor.',
                            confirmButtonColor: '#EF4444'
                        });
                    }
                }
            });

        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: resultado.mensaje });
        }
    } catch (error) {
        console.error('Error general:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar la configuración' });
    }
});

document.getElementById('btnLogout').addEventListener('click', async () => {
    try {
        const respuesta = await fetch('/api/reserva/logout', { method: 'POST' });
        const resultado = await respuesta.json();

        if (resultado.ok) {
            // Redirigir al inicio público
            window.location.href = '/';
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: resultado.mensaje || 'No se pudo cerrar sesión' });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cerrar sesión' });
    }
});



        
