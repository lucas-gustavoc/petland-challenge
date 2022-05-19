class AgendaDoDia {
    horarioDeInicio = ""
    horarioDeFim = ""
    horarios = []
    
    constructor(horarioDeInicio = "08:00", horarioDeFim = "19:00") {
        this.horarioDeInicio = horarioDeInicio
        this.horarioDeFim = horarioDeFim
        this.#testarHorarios()
        this.#preencherAgenda()
    }

    #testarHorarios() {
        
        // testar regex
        
        // testar horário de início sendo maior que o de fim
        const arrInicio = this.horarioDeInicio.split(':')
        const arrFim = this.horarioDeFim.split(':')
        if (parseInt(arrInicio[0] + arrInicio[1]) > parseInt(arrFim[0] + arrFim[1])) 
            throw new Error("Horário de Início não pode ser maior que horário de fim.")
    }

    #preencherAgenda() {
        const arrInicio = this.horarioDeInicio.split(':')
        let meia = arrInicio[1] === "30"

        while (arrInicio.join(':') !== this.horarioDeFim) {
            arrInicio[1] = meia ? "30" : "00"
            this.horarios.push(arrInicio.join(':'))
            if (meia) {
                let proximaHora = parseInt(arrInicio[0]) + 1
                arrInicio[0] = (proximaHora < 10) ? "0" + proximaHora : proximaHora.toString()
            }
            meia = !meia
        }
    }

}

module.exports = AgendaDoDia

const agenda = new AgendaDoDia('08:00', '19:00')
console.log(agenda.horarios)