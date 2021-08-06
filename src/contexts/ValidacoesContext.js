import React from 'react';
import { validarSenha } from '../models/Validacoes';

export const ValidacoesContext = React.createContext();

export const ValidacoesProvider = ({children}) =>{
    return (
        <ValidacoesContext.Provider value={{senha: validarSenha}}>{children}</ValidacoesContext.Provider>
    );
}