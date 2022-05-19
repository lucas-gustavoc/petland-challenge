const router = new require("express").Router()
const encontrarHorariosDisponiveis = require("./ModeloDeAgenda")
const axios = require("axios")

router.get('/agenda', async (req, res) => {
    let availableTimes = await encontrarHorariosDisponiveis()
    res.json(availableTimes)
})

module.exports = router;