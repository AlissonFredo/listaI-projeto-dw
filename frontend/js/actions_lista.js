const handleSubmitLista = () => {
    if (handleValidationList()) {
        const name = document.getElementById('nome_lista').value
        console.log(name);

        //  pegar produtos da tabela
        const trProdutos = document.getElementById('tbody_produtos').childNodes

        const produtos = []

        for (let index = 0; index < trProdutos.length; index++) {
            const value = {
                nome: trProdutos[index].childNodes[0].value,
                categoria: trProdutos[index].childNodes[1].value
            }

            produtos.push(value)
        }

        console.log(produtos);
        // mortar objeto da requisição

        // realizar requisição
    }
}

const handleValidationList = () => {
    const name = document.getElementById('nome_lista').value

    const errorName = document.getElementById('erro_nome_lista')

    errorName.className = 'text-danger bt-3 d-none'

    if (name.length == 0) {
        errorName.className = 'text-danger bt-3'
    }

    return !(name.length == 0)
}