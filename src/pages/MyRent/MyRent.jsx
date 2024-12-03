import { useEffect, useState } from 'react';
import axios from 'axios';
import './MyRent.css';

function MyRent() {
  const [emprestimos, setEmprestimos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/emprestimos')
      .then(response => {
        setEmprestimos(response.data.data); // Atualiza o estado com os dados de empréstimos
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os empréstimos:', error);
        setLoading(false);
      });
  }, []);

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
            <div key={emprestimo.id} className="rent-card">
              <div className="rent-info">
                <h2>{emprestimo.marca} {emprestimo.modelo}</h2>
                <p>Ano: {emprestimo.anoFabricacao}</p>
                <p>Placa: {emprestimo.placa}</p>
                <p>Período: {emprestimo.dataInicio} até {emprestimo.dataFim}</p>
                <p>Valor Total: R$ {emprestimo.valorTotal.toFixed(2)}</p>
              </div>
              <div className="rent-status">
                <span className={`status-badge ${emprestimo.status.toLowerCase()}`}>
                  {emprestimo.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRent;
