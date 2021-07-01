const validarSenha = (senha)=>{
    if (senha.length < 6 || senha.length > 72) {
        return { valido: false, texto: "Senha deve ter 4 e 72 dígitos." }
    } else {
        return { valido: true, texto: "" }
    }
}

export { validarSenha }