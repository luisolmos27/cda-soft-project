const db = require('../config/database'); 

class ServiceController {
    
    async getAll(req, res) {
        try {

            const [rows] = await db.query('SELECT id, nombre, precio, descripcion, created_at FROM servicios');
            res.status(200).json({ 
                message: "Servicios del CDA obtenidos con éxito desde la DB", 
                data: rows 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const [rows] = await db.query('SELECT * FROM servicios WHERE id = ?', [id]);
            
            if (rows.length === 0) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            
            res.status(200).json({ data: rows[0] });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        const { nombre, precio, descripcion } = req.body;
        try {
            if (!nombre || !precio) {
                return res.status(400).json({ error: "El nombre y el precio del servicio son obligatorios" });
            }

            const [result] = await db.query(
                'INSERT INTO servicios (nombre, precio, descripcion) VALUES (?, ?, ?)', 
                [nombre, precio, descripcion || null]
            );

            res.status(201).json({ 
                message: "Nuevo servicio de diagnóstico registrado con éxito", 
                data: { id: result.insertId, nombre, precio, descripcion } 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { nombre, precio, descripcion } = req.body;
        try {
            if (!nombre || !precio) {
                return res.status(400).json({ error: "El nombre y el precio son requeridos para actualizar" });
            }

            const [result] = await db.query(
                'UPDATE servicios SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?', 
                [nombre, precio, descripcion || null, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "El servicio no existe en el sistema" });
            }

            res.status(200).json({ 
                message: "Tarifas del servicio actualizadas correctamente", 
                data: { id, nombre, precio, descripcion } 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const [result] = await db.query('DELETE FROM servicios WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "El servicio que intenta eliminar no existe" });
            }

            res.status(200).json({ 
                message: `Servicio con ID ${id} retirado correctamente del catálogo` 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ServiceController();
