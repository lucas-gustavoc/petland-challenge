const Profissional = require('./Profissional')
const Agendamento = require('./Agendamento')
const { converterHoraEmInt, converterIntEmHora } = require('../utils')

class Agenda {
    horarios = []
    agendamentos = []
    profissionais = []

    constructor(horaInicio = '08:00', horaFim = '18:30') {
        const arrInicio = horaInicio.split(':')

        let meia = arrInicio[1] === "30"
        
        while (arrInicio.join(':') !== horaFim) {

            this.horarios.push({ horario: arrInicio.join(':'), disponibilidade: {} })

            if (meia) {
                let proximaHora = parseInt(arrInicio[0]) + 1
                arrInicio[0] = (proximaHora < 10) ? "0" + proximaHora : proximaHora.toString()
                arrInicio[1] = "00"
            } else {
                arrInicio[1] = "30"
            }
            
            meia = !meia
        }
    }

    incluirProfissional = (profissionalId, nome, inicioExpediente, fimExpediente) => {
        const p = new Profissional(profissionalId, nome, inicioExpediente, fimExpediente)
        this.profissionais.push(p)
        return p
    }

    incluirHorario = (agendamentoId, profissionalId, inicio, fim) => {
        const h = new Agendamento(horarioId, profissionalId, inicio, fim)
        this.agendamentos.push(h)
    }

}

module.exports = Agenda