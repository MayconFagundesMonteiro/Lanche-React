function validarSenha(senha) {
    if (senha.length < 6 || senha.length > 72) {
        return { valido: false, texto: "O Campo 'senha' deve conter entre 6 e 72 caracteres" }
    } else {
        return { valido: true, texto: "" }
    }
}

export { validarSenha }