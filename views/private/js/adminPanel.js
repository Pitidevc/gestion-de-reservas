document.getElementById('btnInicio').addEventListener('click', async () => {
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    contenedorPrincipal.innerHTML = `
        <div class="text-center">
            <p class="text-slate-500">Utiliza el menú lateral para navegar por las diferentes secciones del panel de administración.</p>
        </div>
    `;
});

document.getElementById('btnApartamento').addEventListener('click', async () => {
    // Lógica para mostrar el formulario de agregar apartamento
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    contenedorPrincipal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Agregar Apartamento</h2>
            <form id="formAgregarApartamento" class="max-w-lg mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-[0_22px_70px_4px_rgba(0,0,0,0.05)] border border-white/50 space-y-8">
        
                <div class="text-center space-y-2">
                    <div class="inline-flex p-3 bg-blue-100/50 rounded-2xl text-blue-600 mb-2">
                        <i data-lucide="hotel" class="w-6 h-6"></i>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight">Nuevo Apartamento</h3>
                    <p class="text-slate-500 text-sm">Registra los detalles del apartamento</p>
                </div>

                <div class="space-y-6">
                    <div class="relative group">
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-blue-500 transition-colors">
                            Número de Apartamento
                        </label>
                        <div class="relative pb-4">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <i data-lucide="hash" class="w-5 h-5"></i>
                            </span>
                            <input type="text" id="numeroApartamento" 
                                class="block w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" 
                                placeholder="Ej: 203" required>
                        </div>

                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-blue-500 transition-colors">
                            Piso del Apartamento
                        </label>
                        <div class="relative pb-4">
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <i data-lucide="hash" class="w-5 h-5"></i>
                            </span>
                            <input type="text" id="pisoApartamento" 
                                class="block w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 transition-all outline-none" 
                                placeholder="Ej: 4" required>
                        </div>

                        <div class="group pb-4">
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Cantidad Camas</label>
                            <div class="relative">
                                <select id="cantidadCamas" 
                                    class="block w-full p-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer outline-none">
                                    
                                    <option value="1">1 cama</option>
                                    <option value="2">2 camas</option>
                                    <option value="3">3 camas</option>
                                    <option value="4">4 camas</option>
                                    <option value="5">5 camas</option>
                                    <option value="6">6 camas</option>
                                    <option value="7">7 camas</option>
                                    <option value="8">8 camas</option>
                                    <option value="9">9 camas</option>
                                    <option value="10">10 camas</option>
                                    <option value="11">11 camas</option>
                                    <option value="12">12 camas</option>
                                    <option value="13">13 camas</option>
                                    <option value="14">14 camas</option>
                                    <option value="15">15 camas</option>
                                    <option value="16">16 camas</option>
                                    <option value="17">17 camas</option>
                                    <option value="18">18 camas</option>
                                    <option value="19">19 camas</option>
                                    <option value="20">20 camas</option>

                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </div>

                        <div class="group pb-4">
                            <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Cantidad Baños</label>
                            <div class="relative">
                                <select id="cantidadBanos" 
                                    class="block w-full p-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer outline-none">
                                    
                                    <option value="1">1 baños</option>
                                    <option value="2">2 baños</option>
                                    <option value="3">3 baños</option>
                                    <option value="4">4 baños</option>

                                </select>
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="submit" id="resgistrarAPTO" 
                    class="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3 group">
                    <span>REGISTRAR <br> APARTAMENTO</span>
                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                </button>
            </form>
    `;  
    lucide.createIcons();

    // -- LOGICA DE VERIFICACIÓN DE APARTAMENTO --
    const aptoInp = document.getElementById('numeroApartamento');
    const aptoPis = document.getElementById('pisoApartamento');

    const validarApartamento =  async () => {
        const numero = aptoInp.value.trim();
        const piso = aptoPis.value.trim();
        const botonAPTO =document.getElementById('resgistrarAPTO');
        
        if (!numero || !piso) return; 

        try {
            // Ajusta la URL según tu configuración de rutas en el backend
            const respuesta = await fetch(`/api/reserva/verificar-apartamento/${numero}/${piso}`);
            const data = await respuesta.json();

            

            if (data.existe) {
                // Estilo de error visual
                aptoInp.classList.add('border-red-500', 'ring-4', 'ring-red-500/10');
                aptoPis.classList.add('border-red-500', 'ring-4', 'ring-red-500/10');
                aptoInp.classList.remove('border-transparent', 'focus:border-blue-500/50');
                aptoPis.classList.remove('border-transparent', 'focus:border-blue-500/50');

                botonAPTO.disabled = true;
                botonAPTO.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
                botonAPTO.classList.remove('bg-slate-900', 'hover:bg-blue-600');
                
                swal.fire({
                    icon: "error",
                    title: "Apartamento ya registrado",
                    text: data.mensaje,
                });
                
            } else {
                // Estilo de éxito
                aptoInp.classList.remove('border-red-500', 'ring-red-500/10');
                aptoPis.classList.remove('border-red-500', 'ring-red-500/10');
                aptoPis.classList.add('border-emerald-500/50');
                aptoInp.classList.add('border-emerald-500/50');

                botonAPTO.disabled = false;
                botonAPTO.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
                botonAPTO.classList.add('bg-slate-900', 'hover:bg-blue-600');
            }
        } catch (error) {
            console.error("Error al verificar apartamento:", error);
        }
    };

//Escuchamos el evento 'blur' en AMBOS campos
aptoInp.addEventListener('blur', validarApartamento);
aptoPis.addEventListener('blur', validarApartamento);

    // -- LÓGICA DE ENVÍO DEL FORMULARIO --
    const formAgregarApartamento = document.getElementById('formAgregarApartamento');
    formAgregarApartamento.addEventListener('submit', async (e) => {

        e.preventDefault();

        const numero = document.getElementById('numeroApartamento').value.trim();
        const piso = document.getElementById('pisoApartamento').value.trim();
        const camas = document.getElementById('cantidadCamas').value.trim();
        const banos = document.getElementById('cantidadBanos').value.trim();

        try {
            const respuesta = await fetch('/api/reserva/agregar-apartamento', {method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ numero, piso, camas, banos})
            });
            const resultado = await respuesta.json();

            if(resultado.ok){
                Swal.fire({
                    icon: "success",
                    title: "Registro de apartamento exitoso",
                    text: resultado.mensaje,
                });
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar apartamento",
                    text: resultado.mensaje,
                });
            }

        } catch (error) {
            console.error("Error al registrar apartamento:", error);
        }

    });
});

        




document.getElementById('btnLimpiadores').addEventListener('click', async () => {
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    contenedorPrincipal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Agregar Limpiadores</h2>
        <form id="formAgregarLimpiadores" class="max-w-lg mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-[0_22px_70px_4px_rgba(0,0,0,0.05)] border border-white/50 space-y-8">
            
            <div class="text-center space-y-2">
                <div class="inline-flex p-3 bg-blue-100/50 rounded-2xl text-blue-600 mb-2">
                    <i data-lucide="brush-cleaning" class="w-6 h-6"></i>
                </div>
                <h3 class="text-2xl font-black text-slate-800 tracking-tight">Nuevo Personal</h3>
                <p class="text-slate-500 text-sm">Registra los detalles del equipo de limpieza</p>
            </div>

            <div class="space-y-6">
                <div class="relative group pb-4">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-blue-500 transition-colors">
                        Cédula
                    </label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                            <i data-lucide="hash" class="w-5 h-5"></i>
                        </span>
                        <input type="number" id="cedulaLimpiador"
                            class="block w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all outline-none" 
                            placeholder="Ej: 1020014568" required>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                    <div class="relative group">
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Nombre</label>
                        <input type="text" id="nombreLimpiador" 
                            class="block w-full px-5 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-slate-700 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all outline-none" 
                            placeholder="Marina" required>
                    </div>
                    <div class="relative group pb-4">
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Apellido</label>
                        <input type="text" id="apellidoLimpiador" 
                            class="block w-full px-5 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-slate-700 focus:outline-none focus:border-blue-500/50 focus:bg-white transition-all outline-none" 
                            placeholder="Silva" required>
                    </div>
                </div>

                <div class="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 shadow-inner space-y-4 pb-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label class="text-[10px] font-black text-blue-400 uppercase ml-2 tracking-tighter">Usuario (Cédula)</label>
                            <input type="text" id="usuarioAcceso" name="usuario" readonly 
                                class="w-full bg-transparent border-none text-blue-800 font-bold px-2 outline-none cursor-default text-sm italic" placeholder="---">
                        </div>
                        <div class="space-y-1">
                            <label class="text-[10px] font-black text-blue-400 uppercase ml-2 tracking-tighter">Password Inicial</label>
                            <input type="text" id="passAcceso" name="contrasena" readonly 
                                class="w-full bg-transparent border-none text-blue-800 font-bold px-2 outline-none cursor-default text-sm italic" placeholder="---">
                        </div>
                    </div>
                    <div class="pt-3 border-t border-blue-100/50 flex items-center justify-between px-2">
                        <span class="text-[10px] font-black text-blue-400 uppercase tracking-tighter">Rol de Sistema:</span>
                        <div class="flex items-center space-x-2 bg-blue-500/10 px-3 py-1 rounded-full">
                            <i data-lucide="shield-check" class="w-3 h-3 text-blue-600"></i>
                            <span id="rolUsuario" class="text-xs font-bold text-blue-700 capitalize">limpiador</span>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    <div class="group">
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Disponibilidad</label>
                        <div class="relative pb-4">
                            <select id="estadoTrabajo" 
                                class="block w-full p-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer outline-none">
                                <option value="disponible">Disponible</option>
                                
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <i data-lucide="chevron-down" class="w-4 h-4"></i>
                            </div>
                        </div>
                    </div>

                    <div class="group pb-4">
                        <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Estatus</label>
                        <div class="relative">
                            <select id="estadoGeneral" 
                                class="block w-full p-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-indigo-500/50 transition-all cursor-pointer outline-none">
                                <option value="activo">Activo</option>
                               
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <i data-lucide="chevron-down" class="w-4 h-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" id="btnAddLimp"
                class="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-slate-200 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3 group">
                <span>REGISTRAR LIMPIADOR</span>
                <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
            </button>
        </form>
    `;

    lucide.createIcons();

    // --- LÓGICA DE AUTOGENERACIÓN ---
    const nomInp = document.getElementById('nombreLimpiador');
    const apeInp = document.getElementById('apellidoLimpiador');
    const userOut = document.getElementById('usuarioAcceso');
    const passOut = document.getElementById('passAcceso');
    const cedulaInp = document.getElementById('cedulaLimpiador');
    const rol = document.getElementById('rolUsuario');

    const generarCredenciales = () => {
        const nom = nomInp.value.trim().toLowerCase();
        const ape = apeInp.value.trim().toLowerCase();

        if (nom || ape) {
            // Usuario: nombre + apellido (limpio de tildes y espacios)
            userOut.value = cedulaInp.value ? `${cedulaInp.value}` : "";

            // Password: limpieza + Nombre (Primera letra en Mayúscula)
            const nomFormat = nom.charAt(0).toUpperCase() + nom.slice(1);
            passOut.value = nom ? `limpieza${nomFormat.split(' ')[0]}26` : "";
        } else {
            userOut.value = "";
            passOut.value = "";
        }
    };

    nomInp.addEventListener('input', generarCredenciales);
    apeInp.addEventListener('input', generarCredenciales);


    // -- LOGICA DE VERIFICACIÓN DE CÉDULA --

    cedulaInp.addEventListener('blur', async () => {
        const cedula = cedulaInp.value.trim();

        const btnAddLimp = document.getElementById('btnAddLimp');
        
        if (cedula.length < 5) return; // No verificar si está vacío o es muy corto

        try {
            const respuesta = await fetch(`/api/reserva/verificar-cedula/${cedula}`);
            const data = await respuesta.json();

            if (data.existe) {

                cedulaInp.classList.add('border-red-500', 'ring-4', 'ring-red-500/10');
                cedulaInp.classList.remove('border-transparent');

                btnAddLimp.disabled = true;
                btnAddLimp.classList.add('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
                btnAddLimp.classList.remove('bg-slate-900', 'hover:bg-blue-600');
                
                Swal.fire({
                    icon: "error",
                    title: "Cédula ya registrada",
                    text: data.mensaje,
                });
            } else {
                // Estilo de éxito: Borde verde
                cedulaInp.classList.remove('border-red-500', 'ring-red-500/10');
                cedulaInp.classList.add('border-emerald-500/50');

                btnAddLimp.disabled = false;
                btnAddLimp.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-slate-400');
                btnAddLimp.classList.add('bg-slate-900', 'hover:bg-blue-600');
            }
        } catch (error) {
            console.error("Error al verificar cédula:", error);
        }
    });



    // -- LÓGICA DE ENVÍO DEL FORMULARIO --
    const formAgregarLimpiadores = document.getElementById('formAgregarLimpiadores');
    formAgregarLimpiadores.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cedula = document.getElementById('cedulaLimpiador').value.trim();
        const password = passOut.value;
        const rol = 'limpiador';
        const nombre = document.getElementById('nombreLimpiador').value.trim();
        const apellido = document.getElementById('apellidoLimpiador').value.trim();
        const estadoTrabajo = document.getElementById('estadoTrabajo').value;
        const estadoGeneral = document.getElementById('estadoGeneral').value;

        try {

            const respuesta = await fetch('/api/reserva/agregar-usuario-limpiador', {method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({ cedula, password, rol, nombre, apellido, estadoTrabajo, estadoGeneral})
            }); 
            const resultado = await respuesta.json();


              if(resultado.ok){
                    Swal.fire({
                        icon: "success",
                        title: "Registro de limpiador exitoso",
                        text: resultado.mensaje,
                    });
                }else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al registrar limpiador",
                        text: resultado.mensaje,
                    });
                }

        } catch (error) {
            
        }
    });
});

document.getElementById('btnAsignar').addEventListener('click', async () => {
    const contenedorPrincipal = document.getElementById('contenedorPrincipal');
    
    contenedorPrincipal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">Gestión de Tareas</h2>
        <form id="formAgendarLimpieza" class="max-w-lg mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-[0_22px_70px_4px_rgba(0,0,0,0.05)] border border-white/50 space-y-8">
            
            <div class="text-center space-y-2">
                <div class="inline-flex p-3 bg-emerald-100/50 rounded-2xl text-emerald-600 mb-2">
                    <i data-lucide="calendar-plus" class="w-6 h-6"></i>
                </div>
                <h3 class="text-2xl font-black text-slate-800 tracking-tight">Agendar Limpieza</h3>
                <p class="text-slate-500 text-sm">Asigna personal a una unidad específica</p>
            </div>

            <div class="space-y-6">
                <div class="group">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-emerald-500 transition-colors">
                        Apartamento
                    </label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <i data-lucide="home" class="w-5 h-5"></i>
                        </span>
                        <select id="selectApartamento" required
                            class="block w-full pl-12 pr-10 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all cursor-pointer outline-none">
                            <option value="" disabled selected>Selecciona un apartamento</option>
                            </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>

                <div class="group">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 group-focus-within:text-emerald-500 transition-colors">
                        Personal de Limpieza
                    </label>
                    <div class="relative">
                        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </span>
                        <select id="selectLimpiador" required
                            class="block w-full pl-12 pr-10 py-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 focus:bg-white transition-all cursor-pointer outline-none">
                            <option value="" disabled selected>Asignar limpiador</option>
                            </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>

                <div class="group">
                    <label class="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2">Estado Inicial</label>
                    <div class="relative">
                        <select id="estadoLimpieza" 
                            class="block w-full p-4 bg-slate-100/50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer outline-none">
                            <option value="pendiente">Pendiente</option>
                     
                        </select>
                        <div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" 
                class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-200 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3 group">
                <span>AGENDAR TAREA</span>
                <i data-lucide="check-circle" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
            </button>
        </form>
    `;

    lucide.createIcons();
    
    // Llamamos a la función para cargar los datos de la base de datos
    cargarDatosSelects();

    // --ENVIO DE DATOS --
    const formAgendarLimpieza = document.getElementById('formAgendarLimpieza');
    formAgendarLimpieza.addEventListener('submit', async (e) => {
        e.preventDefault();

        const apartamentoId = document.getElementById('selectApartamento').value;
        const limpiadorId = document.getElementById('selectLimpiador').value;
        const estadoLimpieza = document.getElementById('estadoLimpieza').value;

        try {
            
            // Enviar con las claves que espera el backend: { apartamento, limpiador, estado }
            const respuesta = await fetch('/api/reserva/agregar-limpieza', {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ apartamento: apartamentoId, limpiador: limpiadorId, estado: estadoLimpieza })
            });
            const resultado = await respuesta.json();

            if(resultado.ok){
                Swal.fire({
                    icon: "success",
                    title: "Limpieza agendada exitosamente",
                    text: resultado.mensaje,
                });
            }else {
                Swal.fire({
                    icon: "error",
                    title: "Error al agendar limpieza",
                    text: resultado.mensaje,
                });
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
        }
    });
        
});

async function cargarDatosSelects() {
        const selAptos = document.getElementById('selectApartamento');
        const selLimpiadores = document.getElementById('selectLimpiador');

        try {
            // 1. Obtener Apartamentos (Solo los disponibles)
            const resAptos = await fetch('/api/reserva/apartamentos-limpieza');
            const aptos = await resAptos.json();
            aptos.forEach(apto => {
                const opt = document.createElement('option');
                opt.value = apto._id; // Guardamos el ID de MongoDB
                opt.textContent = `Apartamento: ${apto.numero} (${apto.piso})`;
                selAptos.appendChild(opt);
            });

            // 2. Obtener Limpiadores (Solo los que estén activos)
            const resLimp = await fetch('/api/reserva/limpiadores-disponibles');
            const limpiadores = await resLimp.json();
            limpiadores.forEach(limpiador => {
                const opt = document.createElement('option');
                opt.value = limpiador._id;
                opt.textContent = `${limpiador.nombre} ${limpiador.apellido}`;
                selLimpiadores.appendChild(opt);
            });

        } catch (error) {
            console.error("Error cargando selectores:", error);
        }
}

document.getElementById('btnGestionar').addEventListener('click', async () => {

    try {
            const respuesta = await fetch('/api/reserva/limpiadores');
            const resultado = await respuesta.json();

            const contenedorPrincipal = document.getElementById('contenedorPrincipal');
            let tablaCuerpo = '';
            if(resultado.ok){

                contenedorPrincipal.innerHTML = `
                    <h2 class="text-2xl font-bold mb-6">Gestión de Limpiadores</h2>
                    <div class="overflow-x-auto -mx-8 -mb-8 px-8 pb-8">
                        <table id="tablaLimpiadores" class="min-w-full bg-white">
                            <thead>
                                <tr class="bg-slate-50 border-b-2 border-slate-300">
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Nombre</th>
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Apellido</th>
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Usuario</th>
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Rol</th>
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Est. Trabajo</th>
                                    <th class="px-3 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Est. General</th>
                                    <th class="px-3 md:px-6 py-4 text-center text-xs md:text-sm font-semibold text-slate-700 whitespace-nowrap">Acción</th>
                                </tr>
                            </thead>
                            <tbody id="tablaContenido">
                            </tbody>
                        </table>
                    </div>
                `;

                resultado.limpiadoresList.forEach(limpiador => {
                    tablaCuerpo += `<tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${limpiador.nombre}</td>
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${limpiador.apellido}</td>
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap font-mono">${limpiador.usuario.nombre}</td>
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap capitalize">${limpiador.usuario.rol}</td>
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${limpiador.estadoTrabajo}</td>
                        <td class="px-3 md:px-6 py-4 text-xs md:text-sm text-slate-700 whitespace-nowrap">${limpiador.estadoGeneral}</td>
                        <td class="px-3 md:px-6 py-4 whitespace-nowrap">
                            <button value="${limpiador._id}" class="btn-cambiar-estado bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-lg shadow-md hover:shadow-red-300/40 transition-all">
                                <i data-lucide="trash-2" class="w-4 h-4 md:w-5 md:h-5"></i>
                            </button>
                        </td>
                    </tr>`;
                });
                document.getElementById('tablaContenido').innerHTML = tablaCuerpo;
                lucide.createIcons();
            } else {
                swal.fire({
                    icon: "error",
                    title: "Error al cargar limpiadores",
                    text: resultado.error
                });
            }
        
    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Ocurrió un error inesperado.",
            text: ""
        });
    }
    

});

// logica de eliminar limpiador
document.getElementById('contenedorPrincipal').addEventListener('click', async (e) => {
    // Aceptar clicks dentro del botón (por ejemplo en el icono), usando closest
    const boton = e.target.closest('.btn-cambiar-estado');
    if (!boton) return; // Ignorar clicks que no sean sobre los botones de cambiar estado

        const Seguro = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará al limpiador.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        try {
            if (Seguro.isConfirmed) {
                
                const limpiadorId = boton.value;
                const respuesta = await fetch(`/api/reserva/cambiar-estado-limpiador/${limpiadorId}`, { method: 'DELETE' });
                const resultado = await respuesta.json();

                if (resultado.ok) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Limpiador eliminado',
                        text: resultado.mensaje,
                    });
                    // Refrescar la lista de limpiadores
                    document.getElementById('btnGestionar').click();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar limpiador',
                        text: resultado.mensaje,
                    });
                }
            }
            
        } catch (error) {
            console.error('Error al cambiar eliminar limpiador:', error);
        }

});


// Logica para mostrar las notificaciones con Socket.io
const socket = io(); // Realiza la conexión con el servidor Socket.io
socket.on('limpiezaCurso', (data) => { // Escuchar el evento 'limpiezaCurso' desde el servidor

    Swal.fire({ // Mostrar notificación con SweetAlert2 en la parte superior derecha
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `Limpieza en curso`,
        text: `La limpieza del apartamento ${data.aparta} está en curso por ${data.limpiador}.`,
        showConfirmButton: false,
        timer: 7000
    });
});

socket.on('limpiezaAtrasada', (data) => {

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `Limpieza Atrazada`,
        text: `La limpieza del apartamento ${data.aparta} ha sido atrasada, el limpiador es: ${data.limpiador}.`,
        showConfirmButton: false,
        timer: 7000
    });
});

socket.on('limpiezaCompletada', (data) => {

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: `Limpieza Completada`,
        text: `La limpieza del apartamento ${data.aparta} fue completada por ${data.limpiador}.`,
        showConfirmButton: false,
        timer: 7000
    });
});


// logica configuracion de la cuenta
document.getElementById('btnConfiguracion').addEventListener('click', async () => {
    const mainContent = document.getElementById('contenedorPrincipal');

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
            });// Cierre del addEventListener del botón

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

// Cargar vista de inicio por defecto al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const btnInicio = document.getElementById('btnInicio');
    if (btnInicio) btnInicio.click();
});

//Responsivo para celulares
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
