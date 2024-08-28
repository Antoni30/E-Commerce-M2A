import { Router } from "express";
import { categorias,categoria,createCategoria,updateCategoria,deleteCategoria } from "../controllers/categorias.controller.js";

const route = Router()

route.get('/categorias',categorias)
route.get('/categoria/:id',categoria)
route.post('/categorias',createCategoria)
route.put('/categorias/:id',updateCategoria)
route.delete('/categorias/:id',deleteCategoria)

export default route