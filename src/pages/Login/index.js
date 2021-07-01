import { React,useState } from 'react';
import { useHistory,Link } from 'react-router-dom';
import "./styless.css";
import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const history = useHistory();

    async function login(event){
        event.preventDefault();

        const data ={
            email,
            senha
        }
        try{
            const response = await api.post("api/usuario/v1/login", data);
            localStorage.setItem("usuario", response.data);
            history.push("/");
        }
        catch(error){
            window.alert("Não foi possivel fazer login. E-mail ou senha invalidos.")
        }
    }

    return (
            <div className="divisor-login">
                <form className="login" onSubmit={login}>
                    <label className="l-email-login" for="email">Email</label>
                    <input
                    type="email"
                    value={email} 
                    required
                    onChange={e=>{setEmail(e.target.value)}} 
                    error="sdsds"
                    className="i-email-login"
                    id="email"
                    />
                    <label className="l-senha-login" for="senha">Senha</label>
                    <input
                    type="password"
                    value={senha}
                    required
                    onChange={e => {setSenha(e.target.value)}}
                    className="i-senha-login"
                    id="senha"
                    />
                    <button type="submit">Login</button>
                    <Link className="login-registro" to="/Register">Registrar-se</Link>
                </form>
            </div>
    );
}

export default Login;
