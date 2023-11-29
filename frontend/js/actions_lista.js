const handleSubmitLista = async () => {
    if (handleValidationList()) {
        const lista = await handleSaveLista()

        if (lista) {
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
        }
    }
}

const handleSaveLista = async () => {
    const usuario = handleGetUserSession()

    if (!usuario) {
        console.log('Nenhum usuário encontrado no localStorage');
        return
    }

    const request = {
        nome: document.getElementById('nome_lista').value,
        dataCriacao: handleCurrentDate(),
        usuarioId: usuario.id
    }

    const url = "http://localhost:8080/lista/create"

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:5500'
            },
            body: JSON.stringify(request)
        });

        if (response.status != 200) throw new Error("Falha ao executar request");

        return await response.json()
    } catch (error) {
        console.log(error);
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

const handleCurrentDate = () => {
    const dataAtual = new Date();

    const ano = dataAtual.getFullYear();

    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');

    const dia = String(dataAtual.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
}

const handleGetUserSession = () => {
    let usuario = null

    const usuarioString = sessionStorage.getItem('usuario');

    if (usuarioString) {
        usuario = JSON.parse(usuarioString);
    }

    return usuario
}