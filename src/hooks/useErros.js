import { useState } from 'react';

const useErros = (validacoes)=>{
    const estadoInicial = criarEstadoInicial(validacoes);
    const [erros, setErros] = useState(estadoInicial)

    const validarCampo = (event)=>{
        const {name, value} = event.target;
        const novoEstado = { ...erros };
        novoEstado[name] = validacoes[name](value);
        setErros(novoEstado);
    }

    const possoEnviar = ()=>{
        for(let campo in erros){
            if(!erros[campo].valido){
                return false
            };
        };
        return true;
    }

    return [ erros,validarCampo,possoEnviar ]
}

const criarEstadoInicial = (validacoes)=>{
    const estadoInicial = {};
    for(let campo in validacoes){
        estadoInicial[campo] = {valido: true, texto: ""}
    };
    return estadoInicial
}

export default useErros;