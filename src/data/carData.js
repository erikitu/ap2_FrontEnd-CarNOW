export const cars = [
    {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      ano: 2022,
      valorDiaria: 100,
      disponivel: true,
      imagem: '/carros/corolla.jpg',
      combustivel: 'Gasolina',
      transmissao: 'Automático'
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'Civic',
      ano: 2021,
      valorDiaria: 120,
      disponivel: true,
      imagem: '/carros/civic.jpg',
      combustivel: 'Flex',
      transmissao: 'Automático'
    },
    {
      id: 3,
      marca: 'Volkswagen',
      modelo: 'Gol',
      ano: 2020,
      valorDiaria: 80,
      disponivel: false,
      imagem: '/carros/gol.jpg',
      combustivel: 'Gasolina',
      transmissao: 'Manual'
    }
  ];
  
  export const emprestimos = [
    {
      id: 1,
      carroId: 1,
      dataInicio: '2024-03-01',
      dataFim: '2024-03-05',
      valorTotal: 500,
      status: 'Ativo'
    }
  ];