const handleSubmitLista = async () => {
    if (handleValidationList()) {
        const lista = await handleSaveLista()

        if (lista) {
            await handleSaveProduto(lista)
        }

        window.location.href = "/frontend/src/search_lista.html";
    }
}

const handleSaveProduto = async (lista) => {
    const trProdutos = document.getElementById('tbody_produtos').childNodes

    const url = "http://localhost:8080/produtos/create"

    try {
        for (let index = 0; index < trProdutos.length; index++) {
            const value = {
                nome: trProdutos[index].childNodes[0].value,
                categoria: trProdutos[index].childNodes[1].value,
                listaId: lista.id
            }

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://127.0.0.1:5500'
                },
                body: JSON.stringify(value)
            });

        }
    } catch (error) {
        console.log(error);
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

const handleGetAllLista = async () => {
    const usuario = handleGetUserSession()

    if (!usuario) {
        console.log('Nenhum usuário encontrado no localStorage');
        return
    }

    const url = `http://localhost:8080/lista/all/${usuario.id}`

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:5500'
            }
        });

        if (response.status != 200) throw new Error("Falha ao executar request");

        const listas = await response.json()

        handleListaTrCreation(listas)
    } catch (error) {
        console.log(error);
    }
}

const handleListaTrCreation = (listas) => {
    const tbody = document.getElementById('tbody_listas')

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    listas.forEach(lista => {
        const tdName = document.createElement('td')
        tdName.textContent = lista.nome
        tdName.value = lista.nome

        const tdData = document.createElement('td')
        tdData.textContent = lista.dataCriacao
        tdData.value = lista.dataCriacao

        const iEdit = document.createElement('i')
        iEdit.className = 'fa-solid fa-pen-to-square'

        const buttonEdit = document.createElement('button')
        buttonEdit.title = 'Editar'
        buttonEdit.className = 'btn btn-secondary btn-sm'
        buttonEdit.onclick = () => handleRedirectToListEdit(lista)
        buttonEdit.appendChild(iEdit)

        const iDelete = document.createElement('i')
        iDelete.className = 'fa-solid fa-trash'

        const buttonDelete = document.createElement('button')
        buttonDelete.title = 'Excluir'
        buttonDelete.className = 'btn btn-danger btn-sm'
        buttonDelete.onclick = () => handleRemoveListaFromTable(lista.id)
        buttonDelete.appendChild(iDelete)

        const tdActions = document.createElement('td')
        tdActions.className = 'd-flex justify-content-around'
        tdActions.appendChild(buttonEdit)
        tdActions.appendChild(buttonDelete)

        const trLista = document.createElement('tr')
        trLista.id = lista.id
        trLista.appendChild(tdName)
        trLista.appendChild(tdData)
        trLista.appendChild(tdActions)

        tbody.appendChild(trLista)
    });
}

const handleRemoveListaFromTable = async (id) => {
    const url = `http://localhost:8080/lista/${id}`

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://127.0.0.1:5500'
            }
        });

        if (response.status != 200) throw new Error("Falha ao executar request");

        await handleGetAllLista()
    } catch (error) {
        console.log(error);
    }
}

const handleRedirectToListEdit = (lista) => {
    sessionStorage.removeItem('lista');

    sessionStorage.setItem('lista', JSON.stringify(lista));

    window.location.href = "/frontend/src/edit_lista.html";
}