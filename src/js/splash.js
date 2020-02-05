function registerUser() {
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
        return res.json();
    })
    .then(rjson => {
        console.log(rjson);

        // TODO: Display this message in the page
        alert('Success');
    });
}

function submitLoginUser() {
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
        // Check valid log in 
        // THIS IS REALLY BAD
        // TODO: SECURITY ???
        console.log(rjson);

    })
}