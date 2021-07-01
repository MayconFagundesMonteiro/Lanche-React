import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Catalogo from './pages/Catalogo';
import Login from './pages/Login';
import Register from './pages/Register';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Catalogo}/>
                <Route path="/login" component={Login}/>
                <Route path="/Register" component={Register}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;