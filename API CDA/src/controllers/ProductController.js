const Product = require('../models/Product');

class ProductController {
    
    async getAll(req, res) {
        try {
            const productos = await Product.findAll();
            res.status(200).json({ 
                message: "Productos de inventario obtenidos con éxito", 
                data: productos 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {

            const producto = await Product.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado en el inventario" });
            }
            res.status(200).json({ data: producto });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        // CORREGIDO: Se extrae el 'stock' del body, ya que los productos sí requieren inventario real
        const { nombre, precio, descripcion, stock } = req.body;
        try {
            if (!nombre || precio === undefined || stock === undefined) {
                return res.status(400).json({ error: "El nombre, precio y stock son obligatorios para un producto" });
            }

            const nuevoProducto = await Product.create(nombre, precio, descripcion, stock);
            res.status(201).json({ 
                message: "Producto físico registrado en el inventario con éxito", 
                data: nuevoProducto 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
 
        const { nombre, precio, descripcion, stock } = req.body;
        try {
            if (!nombre || precio === undefined || stock === undefined) {
                return res.status(400).json({ error: "El nombre, precio y stock son requeridos para actualizar" });
            }


            const productoEditado = await Product.update(req.params.id, nombre, precio, descripcion, stock);
            res.status(200).json({ 
                message: "Producto actualizado con éxito en la base de datos", 
                data: productoEditado 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await Product.delete(req.params.id);
            res.status(200).json({ 
                message: `Producto con ID ${req.params.id} eliminado correctamente del inventario` 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProductController();