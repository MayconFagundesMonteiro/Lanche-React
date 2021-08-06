import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import api from '../../services/api';
import img404 from "../../img/404.png"
import "./styless.css"

const AdminLancheModal = ({ id = "modal", obj = null, onClose = () => { }, isEdit = false }) => {
    const [url, setUrl] = useState("");
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const [text, setText] = useState(["Lanche", "Acao"]);
    useEffect(() => {
        if (isEdit) {
            defaultState();
        }
    }, [])

    const authorization = {
        headers: {
            Authorization: `Bearer ${usuario.token}`
        }
    }

    const handleOutsideClick = (e) => {
        if (e.target.id === id) onClose();
    }

    const setterText = () => {
        if (isEdit) {
            setText(["Editar Lanche", "Editar"]);
        }
        else {
            setText(["Adicionar Novo Lanche", "Adicionar Lanche"])
        }
    }

    function operation() {
        if (isEdit) {
            editLanche();
        }
        else if (!isEdit) {
            addLanche();
        }
    }

    function defaultState() {
        setUrl(obj.urlCapa);
        setNome(obj.nome);
        setPreco(obj.preco.toFixed(2));
        setDescricao(obj.descricaoCurta);
    }

    async function addLanche() {
        let data = {
            "nome": nome !== "" ? nome : "Produto de Testes",
            "descricaoCurta": descricao,
            "preco": preco !== "" ? preco : 0.00,
            "categoria": "Geral",
            "urlCapa": url,
            "urlImagem": url
        }

        try {
            await api.post("api/Lanche/v1", data, authorization);
            onClose();
            swal("Sucesso", "O Novo produto foi adicionado com sucesso", "success");
        }
        catch (error) {
            console.log(error.response)
            swal("Erro", "Ocorreu um erro ao realizar a operação", "error");
        }
    }

    async function editLanche() {
        let data = {
            "id": obj.id,
            "nome": nome !== "" ? nome : "Produto de Testes",
            "descricaoCurta": descricao,
            "preco": preco !== "" ? preco : 0.00,
            "categoria": "Geral",
            "urlCapa": url,
            "urlImagem": url
        }

        try {
            await api.put("api/Lanche/v1", data, authorization);
            onClose();
            swal("Sucesso", "As Alterações foram Salvas", "success");
        }
        catch (error) {
            swal("Erro", "Ocorreu um erro ao realizar a operação", "error");
        }
    }

    return (
        <div id="modal" className="modal" onLoad={setterText} onClick={handleOutsideClick}>
            <div className="modal-container">
                <div className="modal-content">
                    <h1 className="modal-content-h1">{text[0]}</h1>

                    <label className="modal-label-url" for="inputUrl">Url Imagem do Produto</label>
                    <input id="inputUrl" className="modal-input-url" onChange={e => setUrl(e.target.value)} value={url} type="text" />
                    <img className="modal-content-img" src={url !== "" ? url : img404} />

                    <label className="modal-label-name" for="inputName">Nome</label>
                    <input id="inputName" className="modal-input-name" type="text" onChange={e => setNome(e.target.value)} value={nome} />

                    <label className="modal-label-preco" for="inputPreco">Preco</label>
                    <input id="inputPreco" className="modal-input-Preco" type="number" onChange={e => setPreco(e.target.value)} value={preco} />

                    <textarea cols="30" rows="10" className="modal-textAreaDescricao" placeholder="Descricao do Produto" onChange={e => setDescricao(e.target.value)} value={descricao} ></textarea>

                    <button className="modal-button-cancelar" onClick={onClose}>Cancelar</button>
                    <button className="modal-button-add" onClick={() => { operation() }}>{text[1]}</button>
                </div>
            </div>
        </div>
    );
}


export default AdminLancheModal;