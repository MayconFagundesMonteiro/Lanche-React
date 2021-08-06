import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import DadosUsuario from './DadosUsuario/DadosUsuario.js';
import DadosPessoais from './DadosPessoais/DadosPessoais.js';
import DadosEntrega from './DadosEntrega/DadosEntrega.js';
import "./styless.css"
import swal from 'sweetalert';

const FormularioCadastro = () => {
    const [dadosColetados, setDadosColetados] = useState("");
    const [etapaAtual, setEtapaAtual] = useState(0);
    const history = useHistory();
    const [counter,setCounter] = useState(1);
    const formularios = [
        <DadosUsuario aoEnviar={coletarDados} />,
        <DadosPessoais aoEnviar={coletarDados} />,
        <DadosEntrega aoEnviar={coletarDados} />,
    ];

    // useEffect(() => {
    //     if (etapaAtual === formularios.length) {
    //         registrar();
    //     }
    // })

    async function registrar() {
        try {
            const data = dadosColetados;
            const response = await api.post("/api/Usuario/v1/CriarConta", data);
            sessionStorage.setItem("usuario", JSON.stringify(response.data));
            swal("Sucesso","Novo usuario registrado com sucesso","success").then((response)=>{
                if(response){
                    history.push("/");
                }
            });
        }
        catch (error) {
            swal("Erro","Ocorreu um erro ao registrar o usuario","error").then((response)=>{
                if(response){
                    history.push("/Register");
                }
            });
        }
    }

    function proximo() {
        setEtapaAtual(etapaAtual + 1);
    }

    function coletarDados(dados) {
        setCounter(counter + 1);
        setDadosColetados({ ...dadosColetados, ...dados});
        if(counter < 3) proximo();
        else registrar();
    }

    return (
        <>
            <body className="fc">
                {
                    formularios[etapaAtual]
                }
            </body>
        </>
    );
}

export default FormularioCadastro;