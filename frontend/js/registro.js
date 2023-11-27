//Função de salvar o Usuário
const salvarUsuario = async () => {

    const request = {
        name: document.getElementById("nome").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("senha").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        cep: document.getElementById("cep").value,
        complemento: document.getElementById("complemento").value,
        numero: document.getElementById("numero").value,
        rua: document.getElementById("rua").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    }

    const url = "http://localhost:8080/api/signup"

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

        window.location.href = "/frontend/src/login.html";
    } catch (error) {
        console.log(error);
    }
};


function validar() {
    let isValidate = true;

    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    if (email === "" || senha === "") {
        alert("Por favor, preencha ambos os campos de e-mail e senha.");
        isValidate = false;
    }

    let campos = camposVazios();
    if (campos.length > 0) {
        alert(campos.join("\n"));
        isValidate = false;
    }

    let senhaErrors = validarSenha(senha);
    if (senhaErrors.length > 0) {
        alert(senhaErrors.join("\n"));
        isValidate = false;
    }

    if (isValidate) {
        salvarUsuario();
    }

    return isValidate;

}


//Função 
function validarSenha(senha) {
    const errors = [];

    const tamanhoValido = senha.length >= 8 && senha.length <= 12;
    const contemNumero = /\d/.test(senha);
    const contemLetra = /[a-zA-Z]/.test(senha);
    const contemCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (!tamanhoValido) {
        errors.push("A senha deve ter entre 8 e 12 caracteres.");
    }

    if (!contemNumero) {
        errors.push("A senha deve conter pelo menos um número.");
    }

    if (!contemLetra) {
        errors.push("A senha deve conter pelo menos uma letra.");
    }

    if (!contemCaractereEspecial) {
        errors.push("A senha deve conter pelo menos um caractere especial.");
    }

    return errors;
}

function confirmarSenha() {
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha != confirmarSenha) {
        alert("Senhas diferentes!");
        return false;
    } else {
        return true;
    }
}

function camposVazios() {
    const errors = [];

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value.trim();
    const cep = document.getElementById("cep").value.trim();

    if (nome === "") {
        errors.push("O campo nome é obrigatório.");
    }

    if (email === "") {
        errors.push("O campo e-mail é obrigatório.");
    }

    if (senha === "") {
        errors.push("O campo senha é obrigatório.");
    }

    if (dataNascimento === "") {
        errors.push("O campo data de nascimento é obrigatório.");
    }

    if (cep === "") {
        errors.push("O campo CEP é obrigatório.");
    }

    return errors;
}



