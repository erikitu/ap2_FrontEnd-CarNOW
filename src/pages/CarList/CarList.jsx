import { cars } from '../../data/carData';
import './CarList.css';

function CarList() {
  return (
    <div className="car-list container">
      <h1>Carros Disponíveis</h1>
      <div className="car-grid">
        {cars.map(carro => (
          <div 
            key={carro.id} 
            className={`car-card ${!carro.disponivel ? 'indisponivel' : ''}`}
          >
            <img src={carro.imagem} alt={`${carro.marca} ${carro.modelo}`} />
            <div className="car-info">
              <h2>{carro.marca} {carro.modelo}</h2>
              <p>Ano: {carro.ano}</p>
              <p>Valor diária: R$ {carro.valorDiaria},00</p>
              <p>Combustível: {carro.combustivel}</p>
              <p>Transmissão: {carro.transmissao}</p>
              <button 
                disabled={!carro.disponivel}
                className={carro.disponivel ? 'btn-alugar' : 'btn-indisponivel'}
              >
                {carro.disponivel ? 'Alugar' : 'Indisponível'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;