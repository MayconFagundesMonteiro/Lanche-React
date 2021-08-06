import Navbar from "../../components/Navbar";
import React, { useState, useEffect, useContext } from 'react';
import { SearchContext } from "../../contexts/SearchContext";
import AdminLancheModal from "../../components/AdminLanchesModal";
import api from "../../services/api";
import "./styless.css";
import swal from "sweetalert";

const Administracao = () => {
    const [lanches, setLanches] = useState([])
    const { search } = useContext(SearchContext);
    const [isLancheModelVisible, setIsLancheModelVisible] = useState(false);
    const [isEditLanche, setIsEditlanche] = useState(false);
    const [obj, setObj] = useState({});
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const authorization = {
        headers: {
            Authorization: `Bearer ${usuario.token}`
        }
    }

    useEffect(() => {
        if (search.length < 1) {
            obterLanches();
        }
        else {
            obterLanchesPorNome(search);
        }
    }, [search, []])

    async function obterLanches() {
        const response = await api.get('api/Lanche/v1');
        setLanches([...response.data]);
    }

    async function obterLanchesPorNome(nomeDoLanche) {
        const response = await api.get(`api/Lanche/v1/EncontrarPorNome?nome=${nomeDoLanche}`);
        setLanches([...response.data]);
    }

    async function deletarAlert(lanche) {
        swal("Tem Certeza?", `Você realmente quer deletar o produto: ${lanche.nome}?`, "warning", { buttons: true, dangerMode: true }).then((response) => {
            if (response) {
                deletar()
            }
        })

        async function deletar() {
            try {
                await api.delete(`/api/Lanche/v1/${lanche.id}`, authorization);
                swal("Sucesso", "O produto foi deletado", "success");
            }
            catch (error) {
                console.log(error);
                swal("Erro", "Ocorreu um erro ao realizar a operação", "error");
            }

        }
    }
    return (
        <>
            <Navbar />
            <body className="bc">
            <h1 className="catalogo-admin-h1">Area de administracao</h1>
                <ul className="catalogo-admin">
                    <button className="admin_novoLanche" onClick={() => { setIsLancheModelVisible(true) }}>Novo Lanche</button>
                    {isLancheModelVisible ? <AdminLancheModal isEdit={isEditLanche} obj={obj} onClose={() => { setIsLancheModelVisible(false); setIsEditlanche(false) }} /> : null}
                    {lanches.map(lanche => (
                        <li key={lanche.id} className="lanches-admin">
                            <img src={lanche.urlCapa} />
                            <h1>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lanche.preco)}</h1>
                            <h2>{lanche.nome}</h2>
                            <p>{lanche.descricaoCurta}</p>
                            <button className="catalogo-admin_editar" onClick={() => { setIsLancheModelVisible(true); setIsEditlanche(true); setObj(lanche); }}>Editar</button>
                            <button className="catalogo-admin_deletar" onClick={() => { deletarAlert(lanche) }}>Deletar</button>
                        </li>
                    ))}
                </ul>
            </body>
        </>
    );
}

export default Administracao;
