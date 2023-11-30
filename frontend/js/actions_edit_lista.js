const handleFillScreenWithData = () => {
    const lista = handleGetListaSession()

    if (!lista) {
        console.log('Nenhuma lista encontrada no localStorage');
        return
    }

    document.getElementById('nome_lista').value = lista.nome

    const tbodyProduct = document.getElementById('tbody_produtos')

    lista.produtos.forEach(produto => {
        const tdName = document.createElement('td')
        tdName.textContent = produto.nome
        tdName.value = produto.nome

        const tdCategory = document.createElement('td')
        tdCategory.textContent = produto.categoria
        tdCategory.value = produto.categoria

        const iEdit = document.createElement('i')
        iEdit.className = 'fa-solid fa-pen-to-square'

        const buttonEdit = document.createElement('button')
        buttonEdit.title = 'Editar'
        buttonEdit.className = 'btn btn-secondary btn-sm'
        buttonEdit.onclick = () => { }
        buttonEdit.appendChild(iEdit)

        const iDelete = document.createElement('i')
        iDelete.className = 'fa-solid fa-trash'

        const buttonDelete = document.createElement('button')
        buttonDelete.title = 'Excluir'
        buttonDelete.className = 'btn btn-danger btn-sm'
        buttonDelete.onclick = () => handleDeleteProduto(produto.id)
        buttonDelete.appendChild(iDelete)

        const tdActions = document.createElement('td')
        tdActions.className = 'd-flex justify-content-around'
        tdActions.appendChild(buttonEdit)
        tdActions.appendChild(buttonDelete)

        const trProduct = document.createElement('tr')
        trProduct.id = produto.id
        trProduct.appendChild(tdName)
        trProduct.appendChild(tdCategory)
        trProduct.appendChild(tdActions)

        tbodyProduct.appendChild(trProduct)
    });
}

const handleGetListaSession = () => {
    let lista = null

    const listaString = sessionStorage.getItem('lista');

    if (listaString) {
        lista = JSON.parse(listaString);
    }

    return lista
}

const handleDeleteProduto = async (id) => {
    const produtoTr = document.getElementById(id)

    const url = `http://localhost:8080/produtos/${id}`

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:5500'
            }
        });

        if (response.status != 200) throw new Error("Falha ao executar request");

        produtoTr.remove()
    } catch (error) {
        console.log(error);
    }
}

const handleUpdateLista = async () => {
    if (handleValidationList()) {
        const lista = handleGetListaSession()

        if (!lista) {
            console.log('Nenhuma lista encontrada no localStorage');
            return
        }

        const request = {
            nome: document.getElementById('nome_lista').value,
            dataCriacao: lista.dataCriacao,
            usuarioId: lista.usuario.id
        }

        const url = `http://localhost:8080/lista/${lista.id}`

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://127.0.0.1:5500'
                },
                body: JSON.stringify(request)
            });

            if (response.status !== 200) {
                throw new Error("Falha ao executar request");
            }
        } catch (error) {
            console.log(error);
        }
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