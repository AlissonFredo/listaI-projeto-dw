const handleFillScreenWithData = () => {
    const lista = handleGetListaSession()

    if (!lista) {
        console.log('Nenhuma lista encontrada no localStorage');
        return
    }

    const ul = document.getElementById('ul-iniciar-compras')

    lista.produtos.forEach(produto => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.id = produto.id

        const input = document.createElement('input');
        input.style.fontSize = '25px';
        input.classList.add('form-check-input', 'me-3');
        input.type = 'checkbox';
        input.value = '';
        input.id = 'firstCheckbox';

        const label = document.createElement('label');
        label.style.fontSize = '25px';
        label.classList.add('form-check-label');
        label.setAttribute('for', 'firstCheckbox');
        label.textContent = produto.nome;

        li.appendChild(input);
        li.appendChild(label);

        ul.appendChild(li)
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