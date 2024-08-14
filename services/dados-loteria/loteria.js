import axios from 'axios';

const lotteryType = 'lotomania';
const LOTERIA_API_URL = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${lotteryType}/`;

export const fetchLoteriaResults = async () => {
  try {
    const { data } = await axios.get(LOTERIA_API_URL);
    return data;
  } catch (err) {
    console.error("Erro ao acessar API da loteria", err);
    throw err;
  }
};
