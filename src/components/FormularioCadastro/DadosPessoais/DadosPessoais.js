import React, { useState } from 'react';
import { NotificationManager,NotificationContainer } from 'react-notifications';
import "./styless.css"

const DadosPessoais = ({aoEnviar}) => {
    const [nome,setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [role, setRole] = useState("x");

    function possoEnviarLocal() {
       if(role !== "x"){
           return true;
       }
       NotificationManager.warning("Selecione um perfil");
       return false;
    }
    return (
        <>
            <NotificationContainer/>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if(possoEnviarLocal()){
                    aoEnviar({nome,sobrenome,role});
                }
            }} className="dpessoais-form">
                <h1>Criar Conta</h1>
                <p>Etapa Atual 2 de 3</p>
                <input
                    value={nome}
                    onChange={e=>{
                        setNome(e.target.value);
                    }}
                    type="text"
                    placeholder="Nome"
                    className="dpessoais-nome"
                    required
                />
                <input
                    value={sobrenome}
                    onChange={e=>{
                        setSobrenome(e.target.value);
                    }}
                    type="text"
                    placeholder="Sobrenome"
                    className="dpessoais-sobrenome"
                />
                <select  onChange={e=>{
                        setRole(e.target.value);
                }} className="dpessoais-select">
                    <option checked value="x">Selecione um Perfil</option>
                    <option value="user">Usuario</option>
                    <option value="employee">Funcionario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button className="dpessoais-button" type="submite">Proximo</button>
            </form>
        </>
    );
}

export default DadosPessoais;