import { Router } from "express";


const route = Router()

route.get('/productos')
route.get('/producto/:id')
route.post('/producto')
route.put('/producto/:id')
route.delete('/producto/:id')

export default route

