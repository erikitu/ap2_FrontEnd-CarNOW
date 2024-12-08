import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './MyRent.css';

function MyRent() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteId, setClienteId] = useState();

  // Carregar clienteId
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setClienteId(user.id);
    } else {
      console.error('Cliente não está logado ou informações ausentes.');
      setLoading(false);
    }
  }, []);

  // Carregar empréstimos do servidor
  useEffect(() => {
    if (!clienteId) return;

    axios
      .get(`http://localhost:3000/listarEmprestimoID?cliente_id=${clienteId}`)
      .then((response) => {
        const emprestimos = response.data.data;

        // Restaurar o estado de devolução a partir do localStorage
        const devolvidos = JSON.parse(localStorage.getItem('devolvidos')) || {};
        const emprestimosAtualizados = emprestimos.map((emprestimo) => ({
          ...emprestimo,
          devolvido: devolvidos[emprestimo.id] || emprestimo.devolvido,
        }));

        setEmprestimos(emprestimosAtualizados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar os empréstimos:', error);
        setLoading(false);
      });
  }, [clienteId]);

  // Devolver carro
  const devolverCarro = (emprestimoId, veiculoId) => {
    axios
      .put(`http://localhost:3000/devolverCarro`, { emprestimo_id: emprestimoId, veiculo_id: veiculoId })
      .then((response) => {
        console.log('Carro devolvido:', response.data);

        // Atualizar estado local
        setEmprestimos((prevEmprestimos) =>
          prevEmprestimos.map((emprestimo) =>
            emprestimo.id === emprestimoId
              ? { ...emprestimo, devolvido: true }
              : emprestimo
          )
        );

        // Salvar estado de devolução no localStorage
        const devolvidos = JSON.parse(localStorage.getItem('devolvidos')) || {};
        devolvidos[emprestimoId] = true;
        localStorage.setItem('devolvidos', JSON.stringify(devolvidos));
      })
      .catch((error) => {
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
          {emprestimos.map((emprestimo) => (
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
                <p>
                  Período: {format(new Date(emprestimo.dataInicio), 'dd/MM/yyyy')} até{' '}
                  {format(new Date(emprestimo.dataFim), 'dd/MM/yyyy')}
                </p>
              </div>
              <div className="rent-actions">
                {emprestimo.devolvido ? (
                  <p className="devolvido-msg">Empréstimo Encerrado</p>
                ) : (
                  <button
                    className="devolver-btn"
                    onClick={() => devolverCarro(emprestimo.id, emprestimo.veiculo_id)}
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
