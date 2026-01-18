markdown
# Gestión de Reservas

Sistema web para la gestión de reservas hoteleras, desarrollado con Node.js y MongoDB, que permite administrar apartamentos, reservas y procesos operativos básicos del hotel.

## Funcionalidades principales

* Gestión de apartamentos: Creación y administración de unidades habitacionales.
* Control de reservas: Registro con validación de fechas para evitar solapamientos.
* Gestión de limpiezas: Control de estados y asignación de tareas de mantenimiento.
* Sistema de autenticación: Acceso restringido mediante roles de administrador, recepcionista y limpiador.
* Control de licencia: Validación de licencia mensual gestionada directamente desde la base de datos.
* Manejo de sesiones: Control de persistencia de usuario en el navegador.

## Tecnologías utilizadas

* Backend: Node.js y Express.
* Base de datos: MongoDB y Mongoose.
* Frontend: HTML, Tailwind CSS y JavaScript.

## Instalación y ejecución

1. Clonar el repositorio:
   git clone https://github.com

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno:
   Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
   MONGO_URI=cadena_de_conexion
   PORT=3000

4. Ejecutar el seed de datos iniciales:
   node seed/seed.js

5. Ejecutar el servidor:
   nodemon server.js
