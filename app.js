// app.js
import { api } from './ApiService.js';

// Elementos del DOM
const formServicio = document.getElementById('form-servicio');
const listaServicios = document.getElementById('lista-servicios');

// Función para cargar y listar los servicios desde la API
async function cargarServicios() {
    try {
        const respuesta = await api.obtenerServicios();
        // Limpiar la tabla
        listaServicios.innerHTML = '';
        
        // Iterar los servicios obtenidos (mapeando la estructura que vimos en Postman)
        respuesta.data.forEach(servicio => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${servicio.id}</td>
                <td>${servicio.nombre}</td>
                <td>$${Number(servicio.precio).toLocaleString()}</td>
                <td>${servicio.descripcion || 'Sin descripción'}</td>
            `;
            listaServicios.appendChild(fila);
        });
    } catch (error) {
        alert('No se pudieron cargar los servicios. Asegúrate de tener el backend encendido.');
    }
}

// Evento para capturar el formulario y enviar el POST
formServicio.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoServicio = {
        nombre: document.getElementById('nombre').value,
        precio: parseFloat(document.getElementById('precio').value),
        descripcion: document.getElementById('descripcion').value
    };

    try {
        await api.crearServicio(nuevoServicio);
        alert('¡Servicio registrado con éxito!');
        formServicio.reset(); // Limpiar formulario
        cargarServicios();   // Recargar la tabla automáticamente
    } catch (error) {
        alert('Error al guardar el servicio.');
    }
});

// Carga inicial al abrir la página
document.addEventListener('DOMContentLoaded', cargarServicios);