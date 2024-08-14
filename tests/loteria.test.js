import axios from 'axios';
import { fetchLoteriaResults } from '@/services/loteria';

jest.mock('axios');

describe('fetchLoteriaResults', () => {
  it('deve retornar os dados corretamente', async () => {
    const mockResponse = { data: { resultados: 'dados' } };
    axios.get.mockResolvedValue(mockResponse);

    const data = await fetchLoteriaResults();

    expect(data).toEqual(mockResponse.data);
  });

  it('deve lançar um erro em caso de falha na API', async () => {
    const error = new Error('Erro ao acessar API da loteria');
    axios.get.mockRejectedValue(error);

    await expect(fetchLoteriaResults()).rejects.toThrow(error);
  });
});
