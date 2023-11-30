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

        handleListaUlCreation(listas)
    } catch (error) {
        console.log(error);
    }
}

const handleListaUlCreation = (listas) => {
    const ul = document.getElementById('ul-lista-compra')

    listas.forEach(lista => {
        const h3Titulo = document.createElement('h3')
        h3Titulo.textContent = lista.nome

        const divTitulo = document.createElement('div')
        divTitulo.className = 'col d-flex align-items-center'
        divTitulo.appendChild(h3Titulo)

        const buttonStart = document.createElement('button')
        buttonStart.className = 'btn btn-primary btn-lg'
        buttonStart.textContent = 'Iniciar compra'
        buttonStart.onclick = () => handleIniciarCompra(lista)

        const divStart = document.createElement('div')
        divStart.className = 'd-flex align-items-center justify-content-end'
        divStart.appendChild(buttonStart)

        const divColStart = document.createElement('div')
        divColStart.className = 'col'
        divColStart.appendChild(divStart)

        const divRow = document.createElement('div')
        divRow.className = 'row'
        divRow.appendChild(divTitulo)
        divRow.appendChild(divColStart)

        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.appendChild(divRow)

        ul.appendChild(li)
    });
}

const handleIniciarCompra = (lista) => {
    sessionStorage.removeItem('lista');

    sessionStorage.setItem('lista', JSON.stringify(lista));

    window.location.href = "/frontend/src/shopping.html";
}