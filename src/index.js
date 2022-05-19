const router = require("./router")
const express = require("express")
const app = express()
const porta = 3000

app.get('/', (req, res) => res.send('API On'))
app.use(express.json())
app.use(router)

app.listen(porta, () => console.log(`Servidor ativo na porta ${porta}`))