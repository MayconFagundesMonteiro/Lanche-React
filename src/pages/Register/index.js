import { React, useContext, useEffect, useState } from 'react';
import "./styless.css"
import api from "../../services/api";
import { useHistory } from "react-router";
import validacoesContext from '../../contexts/ValidacoesContext';
import useErros from "../../hooks/useErros";

const Register = () => {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [numeroResidencia, setNumero] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [role, setRole] = useState("");
    const [validaCF, setValidaCF] = useState({cf:{valido: true, texto: ""}});
    const history = useHistory();
    const validacoes = useContext(validacoesContext);
    const [erros,validarCampo,possoEnviar] = useErros(validacoes);

    useEffect(()=>{
        console.log(role)
    },[role])

    async function Register(e) {
        e.preventDefault();

        const data = {
            nome,
            sobrenome,
            email,
            endereco,
            complemento,
            numeroResidencia,
            senha,
            confirmarSenha,
            role
        }

        try {
            const responde = await api.post('api/usuario/v1/criarconta', data);
            console.log("passou aqui");

            localStorage.setItem("usuario", responde.data);
            history.push("/");
        }
        catch (error) {
            window.alert("Deu Ruim");
        }
    }


    return (
        <form onSubmit={()=>{
            if(possoEnviar()){
                Register()
            }
        }} className="register">

            <label className="l-nome-register" for="nome">Nome</label>
            <input
                type="text"
                id="nome"
                value={nome}
                required
                onChange={e => {
                    setNome(e.target.value);
                }}
                className="i-nome-register"
            />

            <label className="l-sobrenome-register" for="sobrenome">Sobrenome</label>
            <input
                type="text"
                id="sobrenome"
                value={sobrenome}
                onChange={e => {
                    setSobrenome(e.target.value);
                }}
                className="i-sobrenome-register"
            />

            <label className="l-email-register" for="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                required
                onChange={e => {
                    setEmail(e.target.value);
                }}
                className="i-sobrenome-register"
            />

            <label className="l-endereco-register" for="endereco">Endereco</label>
            <input
                type="text"
                id="endereco"
                value={endereco}
                onChange={e => {
                    setEndereco(e.target.value);
                }}
                className="i-endereco-register"
            />

            <label className="l-complemento-register" for="complemento">Complemento</label>
            <input
                type="text"
                id="complemento"
                value={complemento}
                onChange={e => {
                    setComplemento(e.target.value);
                }}
                className="i-complemento-register"
            />

            <label className="l-numero-register" for="numero">Numero</label>
            <input
                type="text"
                id="numero"
                value={numeroResidencia}
                onChange={e => {
                    setNumero(e.target.value);
                }}
                className="i-numero-register"
            />

            <label className="l-senha-register" for="senha">Senha</label>
            <input
                type="password"
                id="senha"
                value={senha}
                required
                name="senha"
                onChange={e => {
                    setSenha(e.target.value);
                }}
                onBlur={validarCampo}
                className="i-senha-register"
                error={!erros.senha.valido}
                helperText={erros.senha.texto}
            />

            <label className="l-confirmarsenha-register" for="confirmarsenha">Confirmar Senha</label>
            <input
                type="password"
                id="confirmarsenha"
                name="confirmarSenha"
                value={confirmarSenha}
                required
                onChange={e => {
                    setConfirmarSenha(e.target.value);
                }}
                onBlur={()=>{
                    if(confirmarSenha !== senha){
                        setValidaCF({cf:{valido: false, texto: "As senhas não conferem."}});
                    }
                    else{
                        setValidaCF({cf:{valido: true, texto: ""}});
                    }
                }}
                error={!validaCF.cf.valido}
                helperText={validaCF.cf.texto}
                className="i-confirmarsenha-register"
            />

            <label for="role-register">Perfil</label>
            <select
                value={role}
                onChange={e => { setRole(e.target.value) }}
            >
                <option defaultChecked value="user">Usuario</option>
                <option value="employee">Funcionario</option>
                <option value="admin">Administrador</option>
            </select>

            <button type="submit">Registrar</button>

        </form>
    );
}

export default Register;