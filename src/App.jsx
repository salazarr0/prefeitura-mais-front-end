import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import PostarDenunciaPage from './pages/PostarDenunciaPage.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/postar-denuncia" element={<PostarDenunciaPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
