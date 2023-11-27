/**
 * Adiciona um produto à tabela de produtos se a validação for bem-sucedida.
 * 
 * Esta função obtém os valores dos campos 'nome_produto' e 'categoria_produto' do formulário.
 * Se a função de validação ('handleValidationProduct') retornar verdadeiro, adiciona uma nova linha
 * na tabela de produtos com esses valores e limpa os campos do formulário.
 */
const handleAddProductToTable = () => {
    const name = document.getElementById('nome_produto').value
    const category = document.getElementById('categoria_produto').value

    if (handleValidationProduct()) {
        const tbodyProduct = document.getElementById('tbody_produtos')

        tbodyProduct.appendChild(handleProductTrCreation(name, category))

        handleCleaningOfProductFields()
    }
}

/**
 * Cria uma linha de produto para ser adicionada à tabela de produtos.
 * 
 * Esta função recebe o nome e a categoria do produto e cria uma nova linha na tabela
 * contendo células para o nome, categoria e botões de edição e exclusão.
 * 
 * @param {string} name - O nome do produto.
 * @param {string} category - A categoria do produto.
 * @returns {HTMLTableRowElement} - Retorna a linha HTML (tr) representando o produto.
 */
const handleProductTrCreation = (name, category) => {
    const singleKey = handleUniqueKeyCreation(name)

    const tdName = document.createElement('td')
    tdName.textContent = name
    tdName.value = name

    const tdCategory = document.createElement('td')
    tdCategory.textContent = category
    tdCategory.value = category

    const iEdit = document.createElement('i')
    iEdit.className = 'fa-solid fa-pen-to-square'

    const buttonEdit = document.createElement('button')
    buttonEdit.title = 'Editar'
    buttonEdit.className = 'btn btn-secondary btn-sm'
    buttonEdit.onclick = () => handleTheClickOnTheProductEditButton(singleKey)
    buttonEdit.appendChild(iEdit)

    const iDelete = document.createElement('i')
    iDelete.className = 'fa-solid fa-trash'

    const buttonDelete = document.createElement('button')
    buttonDelete.title = 'Excluir'
    buttonDelete.className = 'btn btn-danger btn-sm'
    buttonDelete.onclick = () => handleRemoveProductFromTable(singleKey)
    buttonDelete.appendChild(iDelete)

    const tdActions = document.createElement('td')
    tdActions.className = 'd-flex justify-content-around'
    tdActions.appendChild(buttonEdit)
    tdActions.appendChild(buttonDelete)

    const trProduct = document.createElement('tr')
    trProduct.id = singleKey
    trProduct.appendChild(tdName)
    trProduct.appendChild(tdCategory)
    trProduct.appendChild(tdActions)

    return trProduct
}

/**
 * Remove um produto da tabela de produtos.
 * 
 * Esta função recebe uma chave única que identifica o produto na tabela e remove a linha
 * correspondente da tabela de produtos.
 * 
 * @param {string} singleKey - A chave única que identifica o produto na tabela.
 */
const handleRemoveProductFromTable = (singleKey) => {
    document.getElementById(singleKey).remove()
}

/**
 * Limpa os campos do formulário de cadastro de produtos.
 * 
 * Esta função limpa os valores dos campos 'nome_produto' e 'categoria_produto'
 * no formulário de cadastro de produtos.
 */
const handleCleaningOfProductFields = () => {
    document.getElementById('nome_produto').value = ''
    document.getElementById('categoria_produto').value = 'selected'
}

/**
 * Cria uma chave única baseada no nome do produto e no timestamp atual.
 * 
 * Esta função recebe o nome do produto, remove espaços em branco, converte para letras minúsculas
 * e combina com o timestamp atual para criar uma chave única para o produto.
 * 
 * @param {string} name - O nome do produto para o qual a chave única será criada.
 * @returns {string} - A chave única gerada para o produto.
 */
const handleUniqueKeyCreation = (name) => {
    const timestamp = new Date().getTime()

    return `${name.replace(/\s+/g, '').toLowerCase()}_${timestamp}`
}

/**
 * Valida os campos 'nome_produto' e 'categoria_produto' no formulário de produtos.
 * 
 * Esta função obtém os valores dos campos 'nome_produto' e 'categoria_produto' do formulário.
 * Exibe mensagens de erro se os campos não estiverem preenchidos corretamente.
 * 
 * @returns {boolean} - Retorna true se os campos estiverem preenchidos corretamente, senão retorna false.
 */
const handleValidationProduct = () => {
    const name = document.getElementById('nome_produto').value
    const category = document.getElementById('categoria_produto').value

    const errorCategory = document.getElementById('erro_categoria_produto')
    const errorName = document.getElementById('erro_nome_produto')

    errorName.className = 'text-danger bt-3 d-none'
    errorCategory.className = 'text-danger bt-3 d-none'

    if (name.length == 0) {
        errorName.className = 'text-danger bt-3'
    }

    if (category == 'selected') {
        errorCategory.className = 'text-danger bt-3'
    }

    return !(name.length == 0) && !(category == 'selected')
}

/**
 * Manipula o clique no botão de edição de um produto.
 * 
 * Esta função recebe a chave única do produto e obtém os valores de nome e categoria
 * da linha correspondente na tabela. Preenche os campos do formulário de edição com esses valores
 * e configura o botão de submissão para atualizar os dados do produto ao ser clicado.
 * 
 * @param {string} singleKey - A chave única que identifica o produto na tabela.
 */
const handleTheClickOnTheProductEditButton = (singleKey) => {
    const trProduct = document.getElementById(singleKey)

    const name = trProduct.childNodes[0].value
    const category = trProduct.childNodes[1].value

    document.getElementById('nome_produto').value = name
    document.getElementById('categoria_produto').value = category

    const buttonSubmit = document.getElementById('submit_button_product')
    buttonSubmit.textContent = 'Atualizar produto'
    buttonSubmit.onclick = () => handleTableProductUpdate(singleKey)
}

/**
 * Atualiza um produto na tabela de produtos com base na chave única.
 * 
 * Esta função obtém os novos valores de nome e categoria do produto do formulário de edição.
 * Se a validação for bem-sucedida, atualiza os valores na linha correspondente da tabela
 * com os novos dados do produto e redefine o botão de submissão para adicionar um novo produto.
 * 
 * @param {string} singleKey - A chave única que identifica o produto na tabela.
 */
const handleTableProductUpdate = (singleKey) => {
    const name = document.getElementById('nome_produto').value
    const category = document.getElementById('categoria_produto').value

    if (handleValidationProduct()) {
        const trProduct = document.getElementById(singleKey)

        trProduct.childNodes[0].value = name
        trProduct.childNodes[0].textContent = name
        trProduct.childNodes[1].value = category
        trProduct.childNodes[1].textContent = category

        const buttonSubmit = document.getElementById('submit_button_product')
        buttonSubmit.textContent = 'Adicionar produto'
        buttonSubmit.onclick = handleAddProductToTable

        handleCleaningOfProductFields()
    }
}