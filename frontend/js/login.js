async function logar() {
    if (validar()) {

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const login = {
            username: username,
            password: password
        }

        const url = 'http://localhost:8080/api/login';

        try {
            const responseLogin = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (responseLogin.status != 200) throw new Error("Falha ao executar request");

            const usuario = await responseLogin.json()

            sessionStorage.setItem('usuario', JSON.stringify(usuario));

            window.location.href = "/frontend/src/home.html";
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("não validou!");
    }
}

function validar() {
    let isValidate = true;

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Por favor, preencha ambos os campos de e-mail e senha.");
        isValidate = false;
    }

    // let senhaErrors = validarSenha(password);
    // if (senhaErrors.length > 0) {
    //     alert(senhaErrors.join("\n"));
    //     isValidate = false;
    // }

    return isValidate;

}

function validarSenha(password) {
    const errors = [];

    const tamanhoValido = password.length >= 8 && password.length <= 12;
    const contemNumero = /\d/.test(password);
    const contemLetra = /[a-zA-Z]/.test(password);
    const contemCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

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

