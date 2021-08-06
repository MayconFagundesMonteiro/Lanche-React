import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SearchContext } from '../../contexts/SearchContext';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import "./styless.css"
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';

const Navbar = () => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const history = useHistory();
    const [mensagem, setMenssagem] = useState("");
    const [area, setArea] = useState("Carrinho");
    const { search, searchInput } = useContext(SearchContext);
    const { limparCarrinho } = useContext(CarrinhoContext);

    useEffect(() => {
        isLogado();
    })

    function acesso() {
        if (usuario === null) {
            history.push("/login");
        }
        else {
            sessionStorage.clear();
            setArea("Carrinho");
            limparCarrinho();
            history.push("/");
            NotificationManager.success("Logoff realizado com sucesso");
        }
    }

    function acessoArea() {
        if (area == "Administracao") {
            history.push("/Admin");
        }
        else if (area == "Carrinho") {
            history.push("/Carrinho");
        }
    }

    function isLogado() {
        if (usuario === null) {
            setMenssagem("Entrar");
        }
        else {
            setMenssagem("Sair");
            if (usuario.usuario.role == "admin" || usuario.usuario.role == "employee") {
                setArea("Administracao");
            }
            else {
                setArea("Carrinho");
            }
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-div">
                <NotificationContainer />
                <Link className="navbar-home" to="/">Lanches React</Link>
                <ul className="navbar-lista">
                <input onChange={event => searchInput(event.currentTarget.value)} value={search} className="navbar-pesquisa" type="text" placeholder="Pesquisar Lanche" />
                    <li className="navbar-carrinho"><Link onClick={acessoArea}>{area}</Link></li>
                    <li className="navbar-conta"><Link className="navbar-conta-link" onClick={acesso}>{mensagem}</Link></li>
                </ul>
            </div >
        </nav >
    );
}

export default Navbar