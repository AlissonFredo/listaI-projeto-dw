const logout = () => {
    sessionStorage.removeItem('usuario');
    location.reload(true);
}