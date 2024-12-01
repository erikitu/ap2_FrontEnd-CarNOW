import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './consts/layout';
import CarList from './pages/CarList/CarList';
import RentForm from './pages/RentForm/RentForm';
import MyRent from './pages/MyRent/MyRent';
import { ROUTES } from './consts/routes';
import './index.css';

// Define as rotas usando createBrowserRouter
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <CarList /> },
      { path: ROUTES.CARROS, element: <CarList /> },
      { path: ROUTES.ALUGUEL, element: <RentForm /> },
      { path: ROUTES.MEUSALUGUEIS, element: <MyRent /> },
    ],
  },
]);


function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;