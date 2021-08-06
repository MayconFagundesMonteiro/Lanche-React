import { React, useContext, useState } from 'react';
import useErros from '../../../hooks/useErros';
import "./styless.css";
import { ValidacoesContext } from "../../../contexts/ValidacoesContext";
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { NotificationManager } from 'react-notifications';

const DadosUsuario = ({ aoEnviar }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const validacoes = useContext(ValidacoesContext);
    const [erros, validarCampo, possoEnviar] = useErros(validacoes);

    function notification() {
        if (!erros.senha.valido) {
            NotificationManager.warning(erros.senha.texto);
        }
        if (senha !== confirmarSenha) {
            NotificationManager.warning("As senhas não conferem.");
        }
    }

    function localPossoEnviar() {
        if (senha !== confirmarSenha) {
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <>
            <NotificationContainer />
            <form onSubmit={(e) => {
                e.preventDefault();
                if (possoEnviar() && localPossoEnviar()) {
                    aoEnviar({ email, senha, confirmarSenha });
                }
                else {
                    notification();
                }

            }}
                className="dusuario-form">
                <h1>Criar Conta</h1>
                <p>Etapa Atual 1 de 3</p>
                <input
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    required
                    type="email"
                    placeholder="Email"
                    className="dusuario-email"
                />
                <input
                    value={senha}
                    name="senha"
                    onChange={e => {
                        setSenha(e.target.value);

                    }}
                    onBlur={(e) => {
                        validarCampo(e);
                    }}
                    required
                    type="password"
                    placeholder="Senha"
                    className="dusuario-senha"
                />
                <input
                    value={confirmarSenha}
                    onChange={e => {
                        setConfirmarSenha(e.target.value);
                    }}
                    required
                    type="password"
                    placeholder="Confirmar Senha"
                    className="dusuario-confirmarSenha"
                />
                <button type="submit">Proximo</button>
            </form>
        </>
    );
}

export default DadosUsuario;