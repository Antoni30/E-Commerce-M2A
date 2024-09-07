import express, { json } from  "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import users from "./routes/users.routes.js"
import roles from "./routes/roles.routes.js"
import {checkConnection} from './libs/cassandra.js'
import user_roles from './routes/user_roles.routes.js'

const app = express();
const PORT = 2025;

const startServer = async () => {
    const isConnected = await checkConnection();
    if (isConnected) {
      console.log('Connected to Cassandra successfully!');
    } else {
      console.error('Failed to connect to Cassandra.');
      process.exit(1);
    }
  };

startServer();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Server ON 😁👍")
})

app.use('/api',users)
app.use('/api',roles)
app.use('/api',user_roles)


app.listen(PORT,()=>{
    console.log(`🚀 Server start on port http://localhost:${PORT}`)
})
