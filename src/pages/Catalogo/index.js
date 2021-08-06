import { useState, React, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar';
import "./styless.css"
import api from '../../services/api';
import { useHistory } from 'react-router';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { SearchContext } from '../../contexts/SearchContext';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import swal from 'sweetalert';

const Catalogo = () => {
    const [lanches, setLanches] = useState([])
    const history = useHistory();
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const { addAoCarrinho } = useContext(CarrinhoContext);
    const { search } = useContext(SearchContext);

    useEffect(() => {
        if (search.length < 1) {
            obterLanches();
        }
        else {
            obterLanchesPorNome(search);
        }
    }, [search])

    async function obterLanches() {
        const response = await api.get('api/Lanche/v1');
        setLanches([...response.data]);
    }

    async function obterLanchesPorNome(nomeDoLanche) {
        const response = await api.get(`api/Lanche/v1/EncontrarPorNome?nome=${nomeDoLanche}`);
        setLanches([...response.data]);
    }

    function addCarrinho(itemId) {
        if (usuario !== null) {
            if (usuario.usuario.role === "admin" || usuario.usuario.role === "employee") {
                NotificationManager.warning('Admin/Funcionarios não podem fazer compras, entre com sua conta pessoal.');
            }
            else {
                lanches.map(lanche => {
                    if (lanche.id === itemId) {
                        addAoCarrinho(lanche);
                        NotificationManager.success(`${lanche.nome} adicionado ao carrinho`);
                    }
                });
            }
        }
        else if (usuario == null) {
            swal("Faça login para usar o carrinho.").then((response) => {
                if (response) {
                    history.push("/login");
                }
            });
        }
    }
    return (
        <>
            <Navbar />
            <body className="cb">
                <ul className="catalogo">
                    <NotificationContainer />
                    {lanches.map(lanche => (
                        <li key={lanche.id} className="lanches">
                            <img src={lanche.urlCapa} />
                            <h1>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lanche.preco)}</h1>
                            <h2>{lanche.nome}</h2>
                            <p>{lanche.descricaoCurta}</p>
                            <button onClick={() => {
                                addCarrinho(lanche.id);
                            }}>+ Carrinho</button>
                            <h3></h3>
                        </li>
                    ))}
                </ul>
            </body>
        </>
    );
}

export default Catalogo;