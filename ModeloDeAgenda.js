const axios = require('axios')
const urlProfissionais = 'https://api-homolog.geracaopet.com.br/api/challenges/challenge1/employees'

const obterProfissionais = async () => {
    const dados = await axios.get(urlProfissionais)
    const profs = dados.data.employees

    
}

const horarios = {
    '08:00': {}, '08:30': {}, '09:00': {},
    '09:30': {}, '10:00': {}, '10:30': {},
    '11:00': {}, '11:30': {}, '12:00': {},
    '12:30': {}, '13:00': {}, '13:30': {},
    '14:00': {}, '14:30': {}, '15:00': {},
    '15:30': {}, '16:00': {}, '16:30': {},
    '17:00': {}, '17:30': {}, '18:00': {},
    '18:30': {}
}