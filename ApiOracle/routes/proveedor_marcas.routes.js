import { Router } from "express";

const route = Router()

route.get('/proveedor_marcas')
route.get('/proveedor_marca/:id')
route.get('/marca_proveedores/:id')


export default route;
