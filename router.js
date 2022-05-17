const router = new require("express").Router()
const AgendaDoDia = require("./AgendaDoDia")
const axios = require("axios")

const urlProfissionais = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees'

router.get('/agenda', async (req, res) => {
    let obj = await axios.get(urlProfissionais)
    console.log(obj.data)
    res.json(obj.data)
})

module.exports = router;