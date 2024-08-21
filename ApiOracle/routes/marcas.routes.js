import { Router } from "express";


const route = Router()

route.get('/marcas')
route.get('/marca/:id')
route.post('/marcas')
route.put('/marcas/:id')
route.delete('/marcas/:id')


export default route