const axios = require('axios')
const Profissional = require('./models/Profissional')
const Agendamento = require('./models/Agendamento')

const converterHoraEmInt = (strHora) => {
    const split = strHora.split(':')
    return parseInt(split.join(''))
}

const converterIntEmHora = (intHora) => {
    const strHora = intHora.toString()
    const arrHora = ['', '']

    if (strHora.length > 3) {
        arrHora[0] = strHora[0] + strHora[1]
        arrHora[1] = strHora[2] + strHora[3]
    } else {
        arrHora[0] = "0" + strHora[0]
        arrHora[1] = strHora[1] + strHora[2]
    }

    return arrHora.join(':')
}

const obterDiferencaEntreHorarios = (horaInicial = '08:40', horaFinal = '09:20') => {
    let diferencaEmMinutos = 0
    intHoraInicial = parseInt(horaInicial.split(':')[0])
    intMinutoInicial = parseInt(horaInicial.split(':')[1])
    intHoraFinal = parseInt(horaFinal.split(':')[0])
    intMinutoFinal = parseInt(horaFinal.split(':')[1])

    diferencaEmMinutos += (intHoraFinal - intHoraInicial) * 60
    diferencaEmMinutos += (intMinutoFinal - intMinutoInicial)

    return diferencaEmMinutos
}

const obterProfissionais = async () => {
    const url = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees'
    const dados = await axios.get(url)
    const profs = []

    for (let prof of dados.data.employees) profs.push(new Profissional(
        prof.id,
        prof.name,
        prof.startsAt,
        prof.finishesAt
    ))

    return profs;
}

const obterAgendamentos = async (profissionais) => {
    
    let agendamentos = []

    for (let p of profissionais) {
        const url = `https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employee/${p.profissionalId}/appointments`
        const dados = await axios.get(url)
        
        for (let ags of dados.data.appointments) agendamentos.push(new Agendamento(
            ags.appointmentId,
            ags.employeeId,
            ags.startsAt,
            ags.finishesAt
        ))
    }
   
    return agendamentos;
}

module.exports = { 
    converterHoraEmInt, 
    converterIntEmHora, 
    obterProfissionais, 
    obterAgendamentos,
    obterDiferencaEntreHorarios
}