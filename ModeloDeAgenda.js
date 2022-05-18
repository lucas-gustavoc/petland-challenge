const axios = require('axios')

/* 
    Utilizar os dígitos da hora seguidos dos dígitos dos minutos,
    formando um inteiro de três ou quatro dígitos. Assim, temos 
    que 08:30 deve ser digitado como 830; 12:00 deve ser digitado
    como 1200 e assim por diante.
*/
const HORA_INICIO = 830 // 08:30
const HORA_FIM = 1830 // 18:30

const obterProfissionais = async () => {
    const url = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees'
    const dados = await axios.get(url)
    const profs = dados.data.employees
    return profs;
}

const obterHorariosAgendados = async () => {
    const employees = await obterProfissionais()
    
    for (let emp of employees) {
        const url = `https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employee/${emp.id}/appointments`
        const dados = await axios.get(url)
        emp.horariosAgendados = dados.data.appointments
    }
   
    return employees;
}

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

const inicializarAgenda = () => {
    const arrInicio = converterIntEmHora(HORA_INICIO).split(':')
    const horaFim = converterIntEmHora(HORA_FIM)
    const horarios = []
    let meia = arrInicio[1] === "30"
    
    while (arrInicio.join(':') !== horaFim) {

        horarios.push({ horario: arrInicio.join(':'), disponibilidade: {} })

        if (meia) {
            let proximaHora = parseInt(arrInicio[0]) + 1
            arrInicio[0] = (proximaHora < 10) ? "0" + proximaHora : proximaHora.toString()
            arrInicio[1] = "00"
        } else {
            arrInicio[1] = "30"
        }
        
        meia = !meia
    }

    return horarios
}

const verificarDisponibilidade = async () => {
    const horarios = inicializarAgenda()
    const profissionais = await obterHorariosAgendados()

    // Analisar horário de entrada e saída dos funcionários
    for (let h of horarios) {
        const hInt = converterHoraEmInt(h.horario)

        for (let p of profissionais) {
            const pStart = converterHoraEmInt(p.startsAt)
            const pFinish = converterHoraEmInt(p.finishesAt)

            h.disponibilidade[p.id] = !(hInt < pStart || hInt >= pFinish)
        }
    }

    // Analisar horários já ocupados de cada funcionário
    for (let p of profissionais) {
        for (let a of p.horariosAgendados) {
            const iHorario = horarios.find(item => {
                return item.horario === a.startsAt
            })
            
            iHorario.disponibilidade[p.id] = false
        }
    }

    return horarios
}


const encontrarHorariosDisponiveis = async () => {
    const horarios = await verificarDisponibilidade()

    const horariosDisponiveisNaLoja = horarios.filter(item => {
        let horarioDisponivel = false

        for (let k of Object.keys(item.disponibilidade)) {
            if (item.disponibilidade[k]) horarioDisponivel = true
        }

        return horarioDisponivel
    })

    return horariosDisponiveisNaLoja.map(item => item.horario)
}

module.exports = encontrarHorariosDisponiveis