// ApiService.js
class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // Método base para reutilizar la lógica de peticiones
    async request(endpoint, method = 'GET', data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error en ${method} a ${endpoint}:`, error);
            throw error;
        }
    }

    // Consumo del módulo de Servicios (Rutas de tu backend)
    async obtenerServicios() {
        return await this.request('/api/servicios');
    }

    async crearServicio(servicio) {
        return await this.request('/api/servicios', 'POST', servicio);
    }
}

// Exportamos la instancia configurada al puerto de tu Node.js (3000)
export const api = new ApiService('http://localhost:3000');