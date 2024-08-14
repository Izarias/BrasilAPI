import { fetchLoteriaResults } from '/Users/pedroizarias/Documents/brasilApi/loteria.js';
import handler from '@/app';

jest.mock('/Users/pedroizarias/Documents/brasilApi/loteria.json');

describe('handler', () => {
  it('deve retornar os prêmios corretamente', async () => {
    const mockData = {
      listaRateioPremio: [
        { descricaoFaixa: 'Faixa 1', valorPremio: 1000 },
        { descricaoFaixa: 'Faixa 2', valorPremio: 500 },
      ],
    };
    fetchLoteriaResults.mockResolvedValue(mockData);

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { faixa: 'Faixa 1', premio: 1000 },
      { faixa: 'Faixa 2', premio: 500 },
    ]);
  });

  it('deve retornar erro 500 em caso de exceção', async () => {
    fetchLoteriaResults.mockRejectedValue(new Error('Erro'));

    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: 'Erro: 500',
      tipo: 'ERRO_INTERNO',
    });
  });
});
