import { Router } from "express";
import { getProveedores,getProveedorById,createProveedor,deleteProveedor,updateProveedor } from "../controllers/proveedor.controller.js";

const route = Router()

route.get('/proveedores',getProveedores)
route.get('/proveedor/:id',getProveedorById)
route.post('/proveedores',createProveedor)
route.put('/proveedores/:id',updateProveedor)
route.delete('/proveedores/:id',deleteProveedor)



export default route