const router = new require("express").Router()
const { obterProfissionais, obterAgendamentos } = require('./utils')
const Agenda = require('./models/Agenda')
const axios = require("axios")

router.get('/agenda', async (req, res) => {
    
    const agenda = new Agenda('08:00', '19:00')

    // Obtendo dados do servidor
    
    const profissionais = await obterProfissionais()
    agenda.incluirProfissional(...profissionais)

    const agendamentos = await obterAgendamentos(profissionais)
    agenda.incluirAgendamento(...agendamentos)

    // Selecionando horários que tenham ao menos um profissional disponível

    const horariosDisponiveis = agenda.horarios.filter(h => {
        let disponivel = false
        const keys = Object.keys(h.disponibilidade)
        
        for (key of keys) {
            if (h.disponibilidade[key]) disponivel = true
        }

        return disponivel
    })

    // Retornando array com os horários disponíveis

    res.json(horariosDisponiveis.map(h => h.horario))
})

module.exports = router;