const db = require('../config/database'); 
class AuthController {
    
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Consulta real en la tabla de usuarios
            const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
            const user = rows[0];

            // Validación de credenciales
            if (user && user.password === password) {
                return res.status(200).json({ 
                    message: `Autenticación exitosa. ¡Bienvenido al sistema CDA, ${user.username}!`, 
                    token: "token-autenticado-real-db-12345",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            return res.status(401).json({ error: "Credenciales incorrectas" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            // En un entorno real se extrae del token, aquí simulamos el estado de sesión activa
            res.status(200).json({
                message: "Perfil del usuario autenticado obtenido",
                session: { active: true, context: "CDA Soft Módulo Autenticación" }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

  
    async updatePassword(req, res) {
        const { email, newPassword } = req.body;
        try {
            if (!email || !newPassword) {
                return res.status(400).json({ error: "El email y la nueva contraseña son obligatorios" });
            }
         
            const [result] = await db.query('UPDATE usuarios SET password = ? WHERE email = ?', [newPassword, email]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.status(200).json({ message: "Contraseña actualizada con éxito en la Base de Datos" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async logout(req, res) {
        try {
            res.status(200).json({ message: "Sesión cerrada correctamente. Token invalidado." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();