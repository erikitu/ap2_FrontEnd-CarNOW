import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './MyRent.css';

function MyRent() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteId, setClienteId] = useState();

  useEffect(() => {
    // Obter o clienteId do localStorage ao montar o componente
    const user = JSON.parse(localStorage.getItem('user'));
    if (Array.isArray(user) && Array.isArray(user[0]) && user[0][0]?.id) {
      setClienteId(user[0][0].id); // Acesse diretamente o id
    } else {
      console.error('Cliente não está logado ou informações ausentes.');
      setLoading(false);
    }
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    if (!clienteId) return;

    // Buscar empréstimos com o clienteId
    axios
      .get(`http://localhost:3000/listarEmprestimoID?cliente_id=${clienteId}`)
      .then(response => {
        setEmprestimos(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os empréstimos:', error);
        setLoading(false);
      });
  }, [clienteId]); // Este efeito depende de clienteId

  // Função para devolver o carro
  const devolverCarro = (idVeiculo) => {
    axios
      .put(`http://localhost:3000/disponibilidadeVeiculo/${idVeiculo}`, { disponivel: true })
      .then(response => {
        console.log('Disponibilidade atualizada:', response.data);
        
        // Atualizar a lista de empréstimos e marcar como devolvido
        setEmprestimos(prevEmprestimos => 
          prevEmprestimos.map(emprestimo =>
            emprestimo.id === idVeiculo
              ? { ...emprestimo, devolvido: true }
              : emprestimo
          )
        );
      })
      .catch(error => {
        console.error('Erro ao devolver o carro:', error);
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="my-rent container">
      <h1>Meus Empréstimos</h1>
      {emprestimos.length === 0 ? (
        <p className="sem-emprestimos">Nenhum empréstimo encontrado</p>
      ) : (
        <div className="rent-list">
          {emprestimos.map(emprestimo => (
            <div 
              key={emprestimo.id} 
              className={`rent-card ${emprestimo.devolvido ? 'devolvido' : ''}`}
            >
              <div className="rent-info">
                <h2>
                  {emprestimo.marca} {emprestimo.modelo}
                </h2>
                <p>Ano: {emprestimo.anoFabricacao}</p>
                <p>Placa: {emprestimo.placa}</p>
                <p>Período: {format(new Date(emprestimo.dataInicio), 'dd/MM/yyyy')} até {format(new Date(emprestimo.dataFim), 'dd/MM/yyyy')}</p>
              </div>
              <div className="rent-actions">
                {emprestimo.devolvido ? (
                  <p className="devolvido-msg">Empréstimo Encerrado</p>
                ) : (
                  <button 
                    className="devolver-btn"
                    onClick={() => devolverCarro(emprestimo.id)}
                  >
                    Devolver o Carro
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRent;

