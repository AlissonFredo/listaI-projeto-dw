const handleGetUserSessionValidation = () => {
    let usuario = null

    const usuarioString = sessionStorage.getItem('usuario');

    if (usuarioString) {
        usuario = JSON.parse(usuarioString);
    }

    if (!usuario) {
        window.location.href = "/frontend/index.html";
    }
}