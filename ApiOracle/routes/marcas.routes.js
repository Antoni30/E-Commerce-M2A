import { Router } from "express";
import { createMarca,getMarcaById,getMarcas,updateMarca,deleteMarca } from "../controllers/marcas.controller.js";


const route = Router()

route.get('/marcas',getMarcas)
route.get('/marca/:id',getMarcaById)
route.post('/marcas',createMarca)
route.put('/marcas/:id',updateMarca)
route.delete('/marcas/:id',deleteMarca)

export default route