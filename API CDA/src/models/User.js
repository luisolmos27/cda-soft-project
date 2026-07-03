const db = require('../config/database');

class User {
    static async findAll() {
        const [rows] = await db.query('SELECT id, username, email, created_at FROM usuarios');
        return rows;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    }

    static async create(username, email, password) {
        const [result] = await db.query('INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        return { id: result.insertId, username, email };
    }

    static async update(id, username, email) {
        await db.query('UPDATE usuarios SET username = ?, email = ? WHERE id = ?', [username, email, id]);
        return { id, username, email };
    }

    static async delete(id) {
        await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return true;
    }
}

module.exports = User;
