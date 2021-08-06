import React, { useState } from 'react';

export const CarrinhoContext = React.createContext();

export const CarrinhoProvider = ({ children }) => {
    const [carrinhoItens, setCarrinhoItens] = useState([]);

    function addAoCarrinho(item) {
        let exists = false;
        let existsArray = carrinhoItens.slice();
        existsArray.map(lanche =>{
            if(lanche.id == item.id){
                exists=true;
            }
        })
        if (exists) {
            let novoCarrinho = carrinhoItens.slice();
            novoCarrinho.map(lanche=>{
                if(lanche.id == item.id){
                    lanche.quantidade++;
                }
            })
            setCarrinhoItens(novoCarrinho);
        }
        else {
            item.quantidade = 1;
            setCarrinhoItens([...carrinhoItens, item]);
        }
    }
    function removerDoCarrinho(item){
        let novoCarrinho = carrinhoItens.slice();
        novoCarrinho.map(lanche=>{
            if(lanche.id == item.id){
                if(lanche.quantidade > 1){
                    lanche.quantidade--;
                }
            }
        })
        setCarrinhoItens(novoCarrinho);
    }
    function deletarDoCarrinho(item){
        let novoCarrinho = carrinhoItens.slice();
        novoCarrinho.map(lanche =>{
            if(lanche.id == item.id){
                novoCarrinho = novoCarrinho.filter(item => item !== lanche);
            }
        })
        setCarrinhoItens(novoCarrinho);
    }
    function limparCarrinho(){
        setCarrinhoItens([]);
    }
    return (
        <CarrinhoContext.Provider value={{ carrinhoItens, addAoCarrinho, removerDoCarrinho, deletarDoCarrinho, limparCarrinho }}>{children}</CarrinhoContext.Provider>
    );
}