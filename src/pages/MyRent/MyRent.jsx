import { emprestimos } from '../../data/emprestimos';
import { cars } from '../../data/carData'; 
import './MyRent.css';

function MyRent() {
  const getCarroDetalhes = (carroId) => {
    return cars.find(c => c.id === carroId);
  };

  return (
    <div className="my-rent container">
      <h1>Meus Empréstimos</h1>
      {emprestimos.length === 0 ? (
        <p className="sem-emprestimos">Nenhum empréstimo encontrado</p>
      ) : (
        <div className="rent-list">
          {emprestimos.map(emprestimo => {
            const carro = getCarroDetalhes(emprestimo.carroId);
            return (
              <div key={emprestimo.id} className="rent-card">
                <div className="rent-info">
                  <h2>{carro.marca} {carro.modelo}</h2>
                  <p>Período: {emprestimo.dataInicio} até {emprestimo.dataFim}</p>
                  <p>Valor Total: R$ {emprestimo.valorTotal},00</p>
                </div>
                <div className="rent-status">
                  <span className={`status-badge ${emprestimo.status.toLowerCase()}`}>
                    {emprestimo.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyRent;