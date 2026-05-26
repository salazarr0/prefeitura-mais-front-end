
import { useNavigate } from "react-router";

function RegisterPage() {

    const navigate = useNavigate();

    const backButton = () => {

        navigate('/');
    }

    const loginButton = () => {

        navigate('/login');
    }

    return (
        <>
            <div>
                <button onClick={backButton}>Voltar</button>
                <button onClick={loginButton}>Login</button>
                <h1>Registrar</h1>
                <p>Registrar</p>
            </div>
        </>
    )
}

export default RegisterPage