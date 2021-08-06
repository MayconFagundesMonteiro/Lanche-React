import { React, useState } from 'react';
import "./styless.css"

const DadosEntrega = ({ aoEnviar }) => {
    const [endereco, setEndereco] = useState("");
    const [numeroResidencia, setNumeroResidencia] = useState();
    const [complemento, setComplemento] = useState("");
    return (
        <>
            <form onSubmit={e => {
                e.preventDefault();
                aoEnviar({ endereco, numeroResidencia, complemento });
            }} className="dentrega-form">
                <h1>Criar Conta</h1>
                <p>Etapa Atual 3 de 3</p>
                <input
                    value={endereco}
                    onChange={(e) => {
                        setEndereco(e.target.value);
                    }}
                    className="dentrega-endereco"
                    type="text"
                    placeholder="Endereco"
                />
                <input
                    value={numeroResidencia}
                    onChange={e => {
                        setNumeroResidencia(e.target.value);
                    }}
                    className="dentrega-numero"
                    type="number"
                    placeholder="Numero Residencia"
                />
                <input
                    value={complemento}
                    onChange={e => {
                        setComplemento(e.target.value);
                    }}
                    className="dentrega-complemento"
                    type="text"
                    placeholder="Complemento"
                />
                <button type="submit" className="dentrega-button">Registrar</button>
            </form>
        </>
    );
}

export default DadosEntrega;