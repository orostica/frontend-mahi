import axios from 'axios';

const localidades = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br',
})

export default localidades;