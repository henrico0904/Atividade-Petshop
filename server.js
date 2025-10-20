import express from "express";
import dotenv from "dotenv";
import petRoutes from './src/routes/petRoutes.js'

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando...");
});

// Aqui vão todas suas Rotas
app.use('/pets', petRoutes)


app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
