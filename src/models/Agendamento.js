class Agendamento {
    agendamentoId = 0
    profissionalId = 0
    inicio = ""
    fim = ""

    constructor(agendamentoId, profissionalId, inicio, fim) {
        this.agendamentoId = agendamentoId
        this.profissionalId = profissionalId
        this.inicio = inicio
        this.fim = fim
    }
}

module.exports = Agendamento