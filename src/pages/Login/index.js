import { React, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import "./styless.css";
import api from '../../services/api';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import swal from 'sweetalert';

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const history = useHistory();

    async function login(event) {
        event.preventDefault();

        const data = {
            email,
            senha
        }
        try {
            const response = await api.post("api/usuario/v1/login", data);
            sessionStorage.setItem("usuario", JSON.stringify(response.data));
            swal("Logado com sucesso","","success").then((response) => {
                if (response) {
                    history.push("/");
                }
            })
        }
        catch (error) {
            NotificationManager.error("Não foi possivel fazer login. E-mail ou senha invalidos.");
        }
    }

    return (
        <body className="body-login">
            <NotificationContainer />
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input
                    type="email"
                    required
                    onChange={e => { setEmail(e.target.value) }}
                    value={email}
                    className="login-email"
                    id="email"
                    placeholder="Email"
                />
                <input
                    type="password"
                    required
                    onChange={e => { setSenha(e.target.value) }}
                    value={senha}
                    className="login-senha"
                    id="senha"
                    placeholder="Senha"
                />
                <button className="login-submit" type="submit">Login</button>
                <Link className="login-registro" to="/Register">Registrar-se</Link>
            </form>
        </body>
    );
}

export default Login;
