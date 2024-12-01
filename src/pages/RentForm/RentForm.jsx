import { Fragment, useState } from 'react';
import { cars } from '../../data/carData';
import './RentForm.css';

function RentForm() {
  const [formData, setFormData] = useState({
    carroId: '',
    dataInicio: '',
    dataFim: '',
    nome: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Aluguel solicitado:', formData);
    alert('Aluguel solicitado com sucesso!');
  };

  return (
    
    <Fragment>
      <div className="rent-form container">
        <h1>Solicitar Aluguel</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Selecione o Carro</label>
            <select 
              name="carroId"
              value={formData.carroId}
              onChange={handleChange}
              required
            >
              <option value="">Escolha um carro</option>
              {cars.filter(c => c.disponivel).map(carro => (
                <option key={carro.id} value={carro.id}>
                  {carro.marca} {carro.modelo} - {carro.ano}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Data Início</label>
              <input 
                type="date" 
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Data Fim</label>
              <input 
                type="date" 
                name="dataFim"
                value={formData.dataFim}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Nome Completo</label>
            <input 
              type="text" 
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Solicitar Aluguel
          </button>
        </form>
      </div>


    </Fragment>
  );
}

export default RentForm;