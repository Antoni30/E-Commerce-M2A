import express from  "express"
import cors from 'cors'
import {checkConnection,checkConnectionEsclavo} from "./libs/db.js"
import categorias from "./routes/categorias.routes.js"
import marcas from "./routes/marcas.routes.js"
import productos from "./routes/productos.routes.js"
import proveedor from "./routes/proveedor.routes.js"
import proveedor_marca from "./routes/proveedor_marcas.routes.js"

const PORT = 2026;

const app = express()
checkConnection()
checkConnectionEsclavo()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use("/API",categorias)
app.use("/API",marcas)
app.use("/API",proveedor)
app.use('/API',productos)
app.use('/API',proveedor_marca)

app.get('/',(req,res)=>{
    res.send("Server ON 😁👍")
})



app.listen(PORT,()=>{
    console.log(`🚀 Server start on port http://localhost:${PORT}`)
})
