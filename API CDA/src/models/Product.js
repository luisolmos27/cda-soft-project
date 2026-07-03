const db = require('../config/database');

class Product {
    // GET ALL
    async findAll() {
      
        const [rows] = await db.query('SELECT id, nombre, precio, descripcion, stock, created_at FROM productos');
        return rows;
    }


    async findById(id) {
      
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
        return rows[0];
    }

    // CREATE
    async create(nombre, precio, descripcion, stock) {
       
        const [result] = await db.query(
            'INSERT INTO productos (nombre, precio, descripcion, stock) VALUES (?, ?, ?, ?)',
            [nombre, precio, descripcion || null, stock]
        );
        return { id: result.insertId, nombre, precio, descripcion, stock };
    }

    // UPDATE
    async update(id, nombre, precio, descripcion, stock) {

        await db.query(
            'UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, stock = ? WHERE id = ?',
            [nombre, precio, descripcion || null, stock, id]
        );
        return { id, nombre, precio, descripcion, stock };
    }

    // DELETE
    async delete(id) {
      
        await db.query('DELETE FROM productos WHERE id = ?', [id]);
        return true;
    }
}

module.exports = new Product();