import { Router } from "express";

const route = Router()

route.get('/proveedores')
route.get('/proveedor/:id')
route.post('/proveedores')
route.put('/proveedores/:id')
route.delete('/proveedores/:id')



export default route