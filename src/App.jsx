import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import PerfilPage from './pages/PerfilPage.jsx'
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import PostarDenunciaPage from './pages/PostarDenunciaPage.jsx';
import HomePageAdmin from './pages/HomePageAdmin.jsx';
import DashboardAdminPage from './pages/DashboardAdminPage.jsx';
import CriarDepartamentoPage from './pages/CriarDepartamentoPage.jsx';
import EditarDepartamentoPage from './pages/EditarDepartamentoPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import MinhasDenunciasPage from './pages/MinhasDenunciasPage.jsx';
import DenunciaDetalhesPage from './pages/DenunciaDetalhesPage.jsx';

function App() {
  const [todasDenuncias, setTodasDenuncias] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [todosDepartamentos, setTodosDepartamentos] = useState([]);
  const [departamento, setDepartamento] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <HomePage
              todasDenuncias={todasDenuncias}
              setTodasDenuncias={setTodasDenuncias}
              denuncias={denuncias}
              setDenuncias={setDenuncias}
            />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/postar-denuncia" element={<PostarDenunciaPage />} />
          <Route path="/admin" element={
            <HomePageAdmin
              todasDenuncias={todasDenuncias}
              setTodasDenuncias={setTodasDenuncias}
              denuncias={denuncias}
              setDenuncias={setDenuncias}
              todosDepartamentos={todosDepartamentos}
              setTodosDepartamentos={setTodosDepartamentos}
              departamentos={departamento}
              setDepartamento={setDepartamento}
            />}
          />
          <Route path="/admin/dashboard" element={<DashboardAdminPage />} />
          <Route path="/admin/criar-departamento" element={< CriarDepartamentoPage />} />
          <Route path="/admin/editar-departamento/:id" element={< EditarDepartamentoPage />} />
          <Route path="/funcionario/dashboard" element={<DashboardPage />} />
          <Route path="/perfil" element={< PerfilPage />} />
          <Route path="/minhas-denuncias" element={< MinhasDenunciasPage />} />
          <Route path="/denuncias/:id" element={< DenunciaDetalhesPage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App