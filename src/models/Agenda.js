const Profissional = require('./Profissional')
const Agendamento = require('./Agendamento')
const { converterHoraEmInt, obterDiferencaEntreHorarios } = require('../utils')

class Agenda {

    /* 
        NOTA: O array de horários é produzido dinamicamente, e
        contém objetos no seguinte formato de exemplo:

        [{
            horario: '12:00',
            disponibilidade: {
                1: true,
                2: false,
                3: true
            }
        }, ...]

        Sendo que os números 1, 2 e 3, neste exemplo, represen-
        tam os IDs dos profissionais retornados pelo servidor.
        O boolean associado a cada ID indica se o profissional
        está disponível naquele horário (true) ou não (false)
    */
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

    incluirProfissional = (profissional, ...maisProfissionais) => {
        const profsToAdd = [profissional]
        if (maisProfissionais) profsToAdd.push(...maisProfissionais)
        for (let prof of profsToAdd) {
            this.profissionais.push(prof)

            // Registrando horário de trabalho do profissional

            /* 
                NOTA: O horário de fim do expediente do profissional
                não será considerado vago na agenda. Assim, um pro-
                fissional cujo valor de finishesAt for 18:00 estará
                INDISPONÍVEL neste horário, sendo seu último aten-
                dimento às 17:30.
            */

            for (let h of this.horarios) {
                const hInt = converterHoraEmInt(h.horario)
                const pStart = converterHoraEmInt(prof.inicioExpediente)
                const pFinish = converterHoraEmInt(prof.fimExpediente)
    
                h.disponibilidade[prof.profissionalId] = !(hInt < pStart || hInt >= pFinish)
            }
        }
    }

    incluirAgendamento = (agendamento, ...maisAgendamentos) => {
        const agsToAdd = [agendamento]
        if (maisAgendamentos) agsToAdd.push(...maisAgendamentos)
        for (let ag of agsToAdd) {
            this.agendamentos.push(ag)

            // Bloqueando o horário do respectivo profissional
            let horarioId = this.horarios.findIndex(h => h.horario === ag.inicio)
            
            if (horarioId !== -1) {
                // Entra aqui caso o horário exista na agenda
                this.horarios[horarioId].disponibilidade[ag.profissionalId] = false

                // Verificando se o agendamento consumirá mais de um horário ou não
                const nHorarios = Math.ceil(obterDiferencaEntreHorarios(ag.inicio, ag.fim) / 30)

                for (let i = 2; i <= nHorarios; i++) {
                    horarioId++
                    if (this.horarios[horarioId] !== undefined) {
                        this.horarios[horarioId].disponibilidade[ag.profissionalId] = false
                    }
                    
                }
            }
            
        }
    }

}

module.exports = Agenda