import { Router } from "express";
import { categorias,categoria } from "../controllers/categorias.controller.js";

const route = Router()

route.get('/categorias',categorias)
route.get('/categoria/:id',categoria)
route.post('/categorias')
route.put('/categorias/:id')
route.delete('/categorias/:id')

export default route