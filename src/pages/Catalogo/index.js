import { useState,React,useEffect } from 'react';
import Navbar from '../../components/Navbar';
import "./styless.css"
import api from '../../services/api';
import { useHistory } from 'react-router';

const Catalogo = () => {
    const [lanches, setLanches] = useState([])
    const history = useHistory();

    const acessToken = localStorage.getItem("acessToken");

    useEffect(()=>{
        ObterLanches();
    },[])

    const authorization ={
        header:{
            authorization:`Bearer ${acessToken}`
        }
    }

    async function ObterLanches(){
        const response = await api.get('api/Lanche/v1', authorization);
        setLanches([ ...response.data]);
    }

    function teste(){
        window.alert("Para acessar seu carrinho de compras faça login.")
        history.push("/login")
    }
    return (
        <>
            <header>
                <Navbar />
            </header>
            <body>
                <div className="divisor-catalogo">
                    {lanches.map(lanche => (

                        < div className="conteudo-catalogo" key={lanche.id}>
                            <img src={lanche.urlCapa} alt="" />
                            <h3>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(lanche.preco)}</h3>
                            <h1>{lanche.nome}</h1>
                            <p>{lanche.descricaoCurta}</p>
                            <button type="button" onClick={teste}>Incluir no Carrinho</button>
                        </div>
                    ))}
                </div>
            </body>
        </>
    );
}

export default Catalogo;