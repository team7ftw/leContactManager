function registerUser(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    fetch('https://cop4331group7api.azurewebsites.net/users',
        {
            method: 'PUT',
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
    .then(res => {
        console.log(res.json());

        // TODO: Display this message in the page
        alert('Success');
    });
}

function submitLoginUser(e) {
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    fetch('https://cop4331group7api.azurewebsites.net/users/get',
        {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
    .then(res => {
        return res.json();
    })
    .then(rjson => {
        if(rjson == 0) {
            alert('Incorrect username/password!');
            $('#password').val('');
        } else {
            localStorage.setItem('currentUser', rjson[0][0]);
            window.location = 'contact.html';
        }
    });
}