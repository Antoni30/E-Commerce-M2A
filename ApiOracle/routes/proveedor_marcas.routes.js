import { Router } from "express";
import { createProveedorMarca,getProveedorMarcas,updateProveedorMarca,deleteProveedorMarca,getMarcas_de_Proveedor, getProveedores_de_Marca } from "../controllers/proveedor_marcas.controller.js";

const route = Router()

route.post('/proveedor_marcas',createProveedorMarca)
route.get('/proveedor_marcas',getProveedorMarcas)
route.put('/proveedor_marca/:id_proveedor/:id_marca',updateProveedorMarca)
route.delete('/marca_proveedores/:id_proveedor/:id_marca',deleteProveedorMarca)
route.get('/proveedor_marca/proveedor/:id_proveedor',getMarcas_de_Proveedor)
route.get('/proveedor_marca/marca/:id_marca',getProveedores_de_Marca)


export default route;
