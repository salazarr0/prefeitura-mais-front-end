import { useNavigate } from "react-router";

function HomePage() {

    const navigate = useNavigate();

    const registerButton = () => {

        navigate('/registro');
    }

    const loginButton = () => {

        navigate('/login');
    }


    return (
        <>
            <div className="">
                <h1>Prefeitura Mais</h1>
                <button onClick={registerButton}>registrar</button>
                <button onClick={loginButton}>login</button>
            </div>
        </>
    )
}

export default HomePage;