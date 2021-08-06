import { React, useContext, useEffect, useState } from 'react';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import Navbar from "../../components/Navbar"
import { Link } from 'react-router-dom';
import "./styless.css";
import api from '../../services/api';
import swal from 'sweetalert';

const CarrinhoCompra = () => {
    const { carrinhoItens, addAoCarrinho, removerDoCarrinho, deletarDoCarrinho, limparCarrinho } = useContext(CarrinhoContext);
    const [total, setTotal] = useState();
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    useEffect(() => {
        ftotal();
    }, [carrinhoItens])

    const ftotal = () => {
        let result = 0;
        carrinhoItens.map(lanche => {
            result += subtotal(lanche.preco, lanche.quantidade)
        })
        setTotal(result);
    }

    const subtotal = (preco, quantidade) => {
        return preco * quantidade;
    }

    async function venda() {
        const authorization = {
            headers: {
                Authorization: `Bearer ${usuario.token}`
            }
        }
        const data = {
            "idUsuario": usuario.usuario.id,
            "lanches": carrinhoItens.map(lanche => {
                return { "idLanche": lanche.id, "Quantidade": lanche.quantidade }
            })
        }
        try {
            await api.post("api/Venda/v1", data, authorization);
            swal("Sucesso","Sua compra foi finalizada e será entrege no endereco cadastrado","success");
            limparCarrinho();
        }
        catch (error) {
            swal("Erro", `Ocorreu um erro ao finalizar sua compra ${error}`, "error");
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="carrinho-titulo">Carrinho de Compras</h1>
            <body className="body-carrinho">
                <div className="carrinho-div">
                    <ul className="carrinho-ul">
                        {carrinhoItens.map(item => (
                            <li className="carrinho-li">
                                <img src={item.urlCapa} />
                                <h1>{item.nome}</h1>
                                <div className="container-li">
                                    <h2>Preco:</h2>
                                    <h3>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}</h3>
                                    <h4>SubTotal:</h4>
                                    <h5>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal(item.preco, item.quantidade))}</h5>
                                    <h6>X{item.quantidade}</h6>

                                    <button className="carrinho-remover" onClick={() => { removerDoCarrinho(item) }}>-</button>
                                    <button className="carrinho-add" onClick={() => { addAoCarrinho(item) }}>+</button>
                                </div>
                                <button className="carrinho-deletar" onClick={() => { deletarDoCarrinho(item) }}>Remover</button>
                            </li>
                        ))}
                        <div className="carrinho-fim">
                            <p>Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
                            <Link to="/" className="carrinho-voltar">Voltar a home page</Link>
                            <button className="carrinho-finalizar"
                                onClick={() => {
                                    if (carrinhoItens.length < 1) {
                                        swal("O Carrinho está vazio.");
                                    }
                                    else {
                                        swal("Deseja finalizar sua compra agora?",{buttons:["Voltar","Finalizar"]}).then((response)=>{
                                            if(response){
                                                venda()
                                            }
                                        })
                                    }
                                }}>Finalizar compra</button>
                        </div>
                    </ul>
                </div>
            </body>
        </>
    );
}

export default CarrinhoCompra;