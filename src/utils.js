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

module.exports = { converterHoraEmInt, converterIntEmHora }