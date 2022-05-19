class Profissional {
    profissionalId = 0
    nome = ''
    inicioExpediente = ''
    fimExpediente = ''

    constructor(profissionalId, nome, inicioExpediente, fimExpediente) {
        this.profissionalId = profissionalId
        this.nome = nome
        this.inicioExpediente = inicioExpediente
        this.fimExpediente = fimExpediente
    }
}

module.exports = Profissional