import { Router } from "express";
import { getProductoById,getProductos,deleteProducto,updateProducto, createProducto } from "../controllers/productos.controller.js";


const route = Router()

route.get('/productos',getProductos)
route.get('/producto/:id',getProductoById)
route.post('/producto',createProducto)
route.put('/producto/:id',updateProducto)
route.delete('/producto/:id',deleteProducto)

export default route

