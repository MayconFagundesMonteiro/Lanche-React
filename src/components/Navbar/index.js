import React from 'react';
import "./styless.css"

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-div">
                <a className="navbar-home" href="/">Lanches React</a>
                <input className="navbar-pesquisa" type="text" placeholder="Pesquisar Lanche" />
                <ul className="navbar-lista">
                    <li><a href="@">Carrinho</a></li>
                    <li><a href="@">Minha Conta</a></li>
                </ul>
            </div >
        </nav >
    );
}

export default Navbar