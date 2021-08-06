import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Administracao from './pages/Administracao';
import CarrinhoCompra from './pages/CarrinhoCompra';
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Catalogo} />
                <Route path="/login" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/Carrinho" component={CarrinhoCompra} />
                <Route path="/Admin" component={Administracao} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;