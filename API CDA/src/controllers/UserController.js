const db = require('../config/database'); // Conexión a MySQL

class UserController {
    
    // 1. GET: Obtener todos los usuarios de la DB
    async getAll(req, res) {
        try {
            const [rows] = await db.query('SELECT id, username, email, created_at FROM usuarios');
            res.status(200).json({ 
                message: "Listado de usuarios obtenido con éxito desde la DB", 
                data: rows 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 2. GET by ID: Obtener un solo usuario por su ID técnico
    async getById(req, res) {
        const { id } = req.params;
        try {
            const [rows] = await db.query('SELECT id, username, email, created_at FROM usuarios WHERE id = ?', [id]);
            
            if (rows.length === 0) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }
            
            res.status(200).json({ 
                message: `Usuario con ID ${id} encontrado`, 
                data: rows[0] 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 3. POST: Crear o registrar un nuevo usuario/inspector
    async create(req, res) {
        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                return res.status(400).json({ error: "Todos los campos (username, email, password) son obligatorios" });
            }

            const [result] = await db.query(
                'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', 
                [username, email, password]
            );

            res.status(201).json({ 
                message: "Usuario creado con éxito en la Base de Datos", 
                data: { id: result.insertId, username, email } 
            });
        } catch (error) {
            // Manejo por si el correo ya existe (restricción UNIQUE de tu DB)
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: "El correo electrónico ya se encuentra registrado" });
            }
            res.status(500).json({ error: error.message });
        }
    }

    // 4. PUT: Actualizar los datos de un usuario existente
    async update(req, res) {
        const { id } = req.params;
        const { username, email } = req.body;
        try {
            if (!username || !email) {
                return res.status(400).json({ error: "El username y el email son campos obligatorios para actualizar" });
            }

            const [result] = await db.query(
                'UPDATE usuarios SET username = ?, email = ? WHERE id = ?', 
                [username, email, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Usuario no encontrado para actualizar" });
            }

            res.status(200).json({ 
                message: "Usuario actualizado en la DB con éxito", 
                data: { id, username, email } 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // 5. DELETE: Eliminar un usuario de la DB
    async delete(req, res) {
        const { id } = req.params;
        try {
            const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "El usuario que intenta eliminar no existe" });
            }

            res.status(200).json({ 
                message: `Usuario con ID ${id} eliminado correctamente de la DB` 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

// Exportamos una instancia de la clase aplicando POO
module.exports = new UserController();
