const currentUser = localStorage.getItem('currentUser');
const currentUsername = localStorage.getItem('currentUsername');

// Hide toasts so they don't cover UI while hidden
$('.toast').hide();
$('.toast').on('hidden.bs.toast', function() {
   $('.toast').hide(); 
});

$(document).ready(function() {
    $('#currentUsername').val(currentUsername);
    $('#newUsername').val(currentUsername);

    $('main').hide().removeClass('hidden').fadeIn();
});

$('#updateUser').click( () => {
    const newUsername = $('#newUsername').val();

    fetch('https://cop4331group7api.azurewebsites.net/users', {
        method: 'POST',
        body: JSON.stringify({
            'currentUsername': currentUsername,
            'newUsername': newUsername,
            'newPassword': $('#newPass').val()
        })
    }).then(res => {
        $('#successToast').show().toast("show");
        $('#currentUsername').val(newUsername);
        $('#newUsername').val('');
        $('#currentPass').val('');
        $('#newPass').val('');

        localStorage.setItem('currentUsername', newUsername);
    });
});

function logout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location = 'index.html';
}