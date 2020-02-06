function logout() {
    localStorage.removeItem('currentUser');
    window.location = 'index.html';
}