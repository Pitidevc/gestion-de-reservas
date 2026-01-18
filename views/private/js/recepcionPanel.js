
document.addEventListener('DOMContentLoaded', () => {
    
    const boton = document.getElementById('btnNuevaReserva');
    
    if (boton) {
        boton.click();
    }
});


// Función Maestra para cambiar de vista
function switchVista(idAMostrar) {
    const vistas = ['contenedorPrincipal', 'contenedorVisualizar', 'CalendarioCont', 'ContConfig'];
    
    vistas.forEach(id => {
        const el = document.getElementById(id);
        if (id === idAMostrar) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// Eventos de los botones del Sidebar
document.getElementById('btnNuevaReserva').addEventListener('click', () => {
    switchVista('contenedorPrincipal');
});

document.getElementById('btnVerReservas').addEventListener('click', () => {
    switchVista('contenedorVisualizar');
    // Aquí llamarías a tu función para cargar la tabla
});

document.getElementById('btnCalendario').addEventListener('click', () => {
    switchVista('CalendarioCont');
    // Forzamos un pequeño retraso para que el DOM procese que ya no es 'hidden'
    requestAnimationFrame(() => {
        renderizarCalendario();
    });
});




//funcion para poner el puinto de mil en el monto o importe
const inputValor = document.getElementById('inputValor');

inputValor.addEventListener('input', (e) => {
    // 1. Obtenemos el valor y quitamos lo que no sea número
    let valor = e.target.value.replace(/\D/g, "");

    // 2. Si hay valor, lo formateamos con puntos de miles
    if (valor) {
        // Usamos una expresión regular para añadir los puntos
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        e.target.value = valor;
    } else {
        e.target.value = "";
    }
});

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
});





// Función para cargar los apartamentos disponibles desde el servidor
async function cargarApartamentosDisponibles() {

    console.log("Buena")
    const fechaIn = document.getElementById('fechaIngreso').value;
    const horaIn = document.getElementById('horaIngreso')?.value || ''; // Capturamos la hora
    const fechaOut = document.getElementById('fechaSalida').value;
    const horaOut = document.getElementById('horaSalida')?.value || ''; // Capturamos la hora
    const selectApartamento = document.getElementById('Apartamento');

    // Solo hacemos la consulta si ambas fechas están seleccionadas
    if (!fechaIn || !fechaOut) return;

    try {
        // Pasamos las fechas como Query Params
        const url = `/api/reserva/apartamentos-disponibles?fechaIn=${fechaIn}&horaIn=${horaIn}&fechaOut=${fechaOut}&horaOut=${horaOut}`; //el ?indica que en adelante habran parametros y el & separa un parametro del otro
        
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        if(resultado.ok){
            
            selectApartamento.innerHTML = '<option value="" disabled selected>Seleccione un apartamento</option>';

            if (!resultado.disponibles || resultado.disponibles.length === 0) {
                // Mostrar una opción que indique no disponibles
                selectApartamento.innerHTML += '<option disabled selected>No hay apartamentos disponibles</option>';
            } else {
                resultado.disponibles.forEach(apto => {
                    // Mostramos los datos del apartamento
                    selectApartamento.innerHTML += `
                        <option value="${apto._id}">
                            Apartamento: ${apto.numero} - Piso: ${apto.piso} - Camas: ${apto.camas} - Baños: ${apto.banos}
                        </option>
                    `;
                });
            }
        }else{
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultado.mensaje,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#EF4444'
            });
        }
    } catch (error) {
        console.error("Error al cargar apartamentos:", error);
    }
}

//Esto lo usamos para escuchar cada vez que cambie el valor de alguno de estos elementos del html (ID)
['fechaIngreso', 'horaIngreso', 'fechaSalida', 'horaSalida'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', cargarApartamentosDisponibles);
});

//Enviar el formulario de reserva
document.getElementById('formReserva').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        const formData = new FormData(this);
        const datosBase = Object.fromEntries(formData); //se hace porque los FormData no se pueden manipular directamente, asi que se convierten a un objeto normal
        const valorLimpio = datosBase.valor.replace(/\./g, '');
        
        const datosFinales = {

            entrada: datosBase.fechin,
            horEntrada: datosBase.horin,
            salida: datosBase.fechsa,
            horSalida: datosBase.horsa,
            origen: datosBase.origen,
            apartamento: datosBase.apartamento,
            cliente: datosBase.nombreTitular, // El primero suele ser el titular
            celular: datosBase.celular,
            acompanantes: datosBase.acompanantes,
            valor: valorLimpio,
            observaciones: datosBase.observaciones
        };


        const respuesta = await fetch('/api/reserva/crear-reserva', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosFinales)
        });

        const resultado = await respuesta.json();

        if (resultado.ok) {
            swal.fire({
                icon: 'success',
                title: 'Reserva creada',
                text: resultado.mensaje,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#10B981'
            }).then(() => {
                    // 1. Limpia todos los campos de texto
                    document.getElementById('formReserva').reset(); 
                });
        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultado.mensaje,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#EF4444'
            });
        }
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al procesar la reserva.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#EF4444'
        });
        
    }
    
});


//ver reservas existentes
document.getElementById('btnVerReservas').addEventListener('click', async () => {
    try {

       
        const tablaVisualizar = document.getElementById('tablaVisualizar');

        const respuesta = await fetch('/api/reserva/ver-reservas');
        const resultado = await respuesta.json();

        if (resultado.ok) { 
            let reservasHTML = '';
            resultado.reservas.forEach(reserva => {
                const entrada = new Date(reserva.fechaIngreso).toLocaleDateString();
                const salida = new Date(reserva.fechaSalida).toLocaleDateString();

                //sacar los dias
                const fechaIn = new Date(reserva.fechaIngreso);
                const fechaOut = new Date(reserva.fechaSalida);

                // Calculamos la diferencia en milisegundos
                const diferenciaMilisegundos = fechaOut - fechaIn;

                // Convertimos a días: milisegundos / (1000ms * 60s * 60m * 24h)
                // Usamos Math.round
                const totalDias = Math.round(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

                const horEntrada = reserva.horaIngreso ?  reserva.horaIngreso : "no confirmada" ;
                const horSalida = reserva.horaSalida ? reserva.horaSalida : "no confirmada";
                const acomp = reserva.acompanantesDetalle ? reserva.acompanantesDetalle : "sin acompañantes" ;
                const valorFormateado = reserva.importe.toLocaleString('es-CO', {
                    minimumFractionDigits: 0, // Mínimo de decimales
                    maximumFractionDigits: 0  // Máximo de decimales (cero si quieres 20.000)
                });
                const confirmacion = reserva.confirmada == false ? "No Confirmada" : "Confirmada";

                reservasHTML += `
                        <tr class="border-b border-slate-200">
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${reserva.apartamento?.numero || 'N/A'}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${reserva.apartamento?.piso || '-'}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${entrada}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${horEntrada}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${salida}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${horSalida}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${totalDias}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${reserva.cliente}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${reserva.celular}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${reserva.origen}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700">
                                <details class="cursor-pointer bg-slate-100 p-2 rounded-lg min-w-[150px]">
                                    <summary class="font-semibold text-emerald-600">Ver notas</summary>
                                    <div class="mt-2  text-slate-600 border-t border-slate-200 pt-2">
                                        ${acomp}
                                    </div>
                                </details>
                            </td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700">
                                <details class="cursor-pointer bg-slate-100 p-2 rounded-lg min-w-[150px]">
                                    <summary class="font-semibold text-emerald-600">Ver notas</summary>
                                    <div class="mt-2  text-slate-600 border-t border-slate-200 pt-2">
                                        ${reserva.observaciones || 'Sin Observaciones'}
                                    </div>
                                </details>
                            </td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${confirmacion}</td>
                            <td class="px-3 md:px-4 py-3 text-xs md:text-sm text-slate-700 whitespace-nowrap">${valorFormateado}</td>
                            <td class="px-3 py-3 whitespace-nowrap">
                                <button onclick="abrirModalEdicion('${reserva._id}')" 
                                        class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                                    <i data-lucide="file-edit" class="w-4 h-4"></i> 
                                </button>
                            </td>
                            <td class="px-3 py-3 whitespace-nowrap">
                                <button onclick="eliminarReserva('${reserva._id}')" 
                                        class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i> 
                                </button>
                            </td>
                        </tr>
                    `;
            });
            tablaVisualizar.innerHTML = reservasHTML;
            lucide.createIcons();
        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultado.mensaje,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#EF4444'
            });
        }
    } catch (error) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al conectarse con el server',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#EF4444'
        });
    }

});


//Logica para el modal de editar reserva
// 1. Abrir y cargar datos
async function abrirModalEdicion(id) {
    try {
        const respuesta = await fetch(`api/reserva/obtener-una-reserva/${id}`);
        const data = await respuesta.json();

        if(data.ok) {
            document.getElementById('editReservaId').value = id;
            document.getElementById('editHoraIngreso').value = data.reserva.horaIngreso || 'Sin confirmar';
            document.getElementById('editHoraSalida').value = data.reserva.horaSalida || 'Sin confirmar';
            document.getElementById('editAcompanantes').value = data.reserva.acompanantesDetalle || '';
            document.getElementById('editObservaciones').value = data.reserva.observaciones || '';
            document.getElementById('editConfirmada').value = data.reserva.confirmada ? "true" : "false";
            document.getElementById('modalEdicion').classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error al cargar reserva", error);
    }
}

// 2. Cerrar modal
function cerrarModal() {
    document.getElementById('modalEdicion').classList.add('hidden');
}

// 3. Enviar cambios (Submit del form)
document.getElementById('formEditarReserva').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editReservaId').value;
    const formData = new FormData(e.target);
    const datos = Object.fromEntries(formData);

    try {
        const respuesta = await fetch(`/api/reserva/actualizar-reserva/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        if(resultado.ok) {
            swal.fire("¡Éxito!", "Reserva actualizada", "success").then(() => window.location.reload());
        }
    } catch (error) {
        swal.fire("Error", "No se pudo actualizar", "error");
    }
});


//logica para eliminar reserva
async function eliminarReserva(id) {
    const confirmacion = await swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#EF4444',
        cancelButtonColor: '#6B7280',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    try {
        if (confirmacion.isConfirmed) {
            const respuesta = await fetch(`/api/reserva/eliminar-reserva/${id}`, {
                method: 'DELETE',
            });
            const resultado = await respuesta.json();

            if (resultado.ok) {
                swal.fire('¡Eliminado!', 'La reserva ha sido eliminada.', 'success');
                // Recargar la vista de reservas
                document.getElementById('btnVerReservas').click();
            } else {
                swal.fire('Error', resultado.mensaje || 'No se pudo eliminar la reserva.', 'error');
            }
        }

    } catch (error) {
        
    }
}

//Logica para el calendario
let calendar; // Variable global
// Variable global para manejar la navegación del calendario
let fechaActual = new Date();
let todasLasReservas = []; // Para no pedir datos al servidor en cada clic

async function renderizarCalendario() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    // Si ya existe una instancia de FullCalendar, la destruimos para crear una limpia
    if (calendar) {
        calendar.destroy();
    }
    
    try {
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1;
        
        console.log(`Cargando datos para ${mes}/${año}...`);
        const res = await fetch(`/api/reserva/verReservaMes?mes=${mes}&anio=${año}`);
        todasLasReservas = await res.json();

        
        
        const eventos = todasLasReservas.map(r => {

            const dIn = new Date(r.fechaIngreso);
            const dOut = new Date(r.fechaSalida);

            // SUMAR 1 DÍA al objeto Date de salida
            // Esto corrige que no se pinte el último día sin afectar la zona horaria
            dOut.setDate(dOut.getDate() + 1);
            

            return{
                id: r._id,
                title: r.cliente,
                start: dIn,
                end: dOut,
                backgroundColor: r.origen === 'Airbnb' ? '#f43f5e' : (r.origen === 'Booking' ? '#2563eb' : '#10b981'),
                borderColor: 'transparent',
                allDay: true
            };
            
        });

        calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            events: eventos,
            selectable: true,
            // Sincronizar la fechaActual con la navegación del calendario
            datesSet: (info) => {
                fechaActual = info.view.currentStart;
            },
            dateClick: function(info) {
                mostrarDetallesAbajo(info.dateStr);
            }
        });

        calendar.render();

        // Ajuste de tamaño tras renderizar (Soluciona problemas visuales en contenedores dinámicos)
        setTimeout(() => {
            calendar.updateSize();
        }, 50);

    } catch (e) {
        console.error("Error al cargar FullCalendar:", e);
    }
}

function mostrarDetallesAbajo(fechaSeleccionada) {
    const listaCont = document.getElementById('listaReservasDia');
    const label = document.getElementById('fechaSeleccionadaLabel');
    
    // 1. Ajustar la etiqueta de fecha (Usamos T12:00:00 para evitar saltos de día al mostrar el nombre)
    const fechaObj = new Date(fechaSeleccionada + "T12:00:00");
    label.innerText = `Reservas para el: ${fechaObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`;

    // 2. Filtrar usando strings directamente
    const filtradas = todasLasReservas.filter(res => {
        // Tomamos el string "YYYY-MM-DD" directamente del campo de la BD
        const checkIn = new Date(res.fechaIngreso).toLocaleDateString('en-CA', {
            timeZone: 'America/Bogota'
        });
        const checkOut = new Date(res.fechaSalida).toLocaleDateString('en-CA', {
            timeZone: 'America/Bogota'
        });
  
        // Comparamos strings (fechaSeleccionada ya es "YYYY-MM-DD")
        return fechaSeleccionada >= checkIn && fechaSeleccionada <= checkOut;
    });

    listaCont.innerHTML = '';

    if (filtradas.length === 0) {
        listaCont.innerHTML = '<p class="text-slate-400 italic">No hay registros para este día.</p>';
        return;
    }

    // 3. Renderizar las tarjetas
    filtradas.forEach(res => {
        const checkInStr = res.fechaIngreso.split('T')[0];
        const checkOutStr = res.fechaSalida.split('T')[0];

        const esCheckIn = checkInStr === fechaSeleccionada;
        const esCheckOut = checkOutStr === fechaSeleccionada;

        let badge = '<span class="bg-slate-200 px-2 py-1 rounded text-[10px] font-bold">OCUPADO</span>';
        if (esCheckIn) badge = '<span class="bg-green-500 text-white px-2 py-1 rounded text-[10px] font-bold">ENTRADA</span>';
        if (esCheckOut) badge = '<span class="bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold">SALIDA</span>';

        listaCont.innerHTML += `
            <div class="p-4 border rounded-xl shadow-sm bg-white flex flex-col gap-2 hover:border-blue-300 transition-all border-l-4 ${esCheckIn ? 'border-l-green-500' : (esCheckOut ? 'border-l-red-500' : 'border-l-slate-300')}">
                <div class="flex justify-between items-start">
                    <div>
                        ${badge}
                        <h4 class="font-bold text-slate-800 text-lg mt-1">${res.cliente}</h4>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-slate-400 uppercase font-bold">Apto</p>
                        <p class="font-bold text-blue-600 text-xl">${res.apartamento?.numero || 'N/A'}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-2 border-t pt-2">
                    <div class="text-sm text-slate-600">
                        <i class="fas fa-wallet mr-1 text-slate-400"></i> $${new Intl.NumberFormat('es-CO').format(res.importe)}
                    </div>
                    <button onclick="abrirModalEdicion('${res._id}')" class="text-blue-500 hover:text-blue-700 text-xs font-bold">
                        <i class="fas fa-edit mr-1"></i>EDITAR
                    </button>
                </div>
            </div>
        `;
    });
}


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


//Logica Gestion de la cuenta de recepcionista
document.getElementById('btnRecep').addEventListener('click', async () => {
    switchVista('ContConfig'); // Función  que oculta lo demás

    try {
        const respuesta = await fetch('/api/reserva/usuario-actual');
        const resultado = await respuesta.json();

        if (resultado.ok) {
            // Rellenamos los inputs existentes en el HTML
            document.getElementById('configUsername').value = resultado.usuario.nombre;
            lucide.createIcons();
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: resultado.mensaje });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo cargar la cuenta' });
    }
});

// Evento para el botón de cambiar contraseña
document.getElementById('btnCambiarContrasena').addEventListener('click', async () => {
    const { value: nuevaContrasena } = await Swal.fire({
        title: 'Cambiar Contraseña',
        html: `
            <div class="relative w-full" style="text-align: left;">
                <label class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                <div style="position: relative;">
                    <input id="swal-input-password" type="password" class="swal2-input" placeholder="Mínimo 4 caracteres" style="width: 100%; margin: 0; padding-right: 40px;">
                    <button type="button" id="swal-toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #64748b;">
                        <svg id="swal-eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                </div>
            </div>`,
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        confirmButtonColor: '#10B981',
        didOpen: () => {
            const input = document.getElementById('swal-input-password');
            const toggleBtn = document.getElementById('swal-toggle-password');
            const icon = document.getElementById('swal-eye-icon');
            toggleBtn.addEventListener('click', () => {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                icon.innerHTML = isPassword 
                    ? `<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>`
                    : `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`;
            });
        },
        preConfirm: () => {
            const val = document.getElementById('swal-input-password').value;
            if (!val || val.length < 4) {
                Swal.showValidationMessage('Mínimo 4 caracteres');
                return false;
            }
            return val;
        }
    });

    if (nuevaContrasena) {
        enviarNuevaContrasena(nuevaContrasena);
    }
});

// Función auxiliar para el envío
async function enviarNuevaContrasena(nuevaContrasena) {
    Swal.fire({ title: 'Actualizando...', didOpen: () => Swal.showLoading(), allowOutsideClick: false });

    try {
        const respuesta = await fetch('/api/reserva/cambiar-contrasena', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nuevaContrasena })
        });
        const resultado = await respuesta.json();

        if (resultado.ok) {
            await Swal.fire({ icon: 'success', title: '¡Éxito!', text: 'Contraseña actualizada' });
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: resultado.mensaje });
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Error de conexión' });
    }
}
