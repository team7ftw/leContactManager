const currentUser = localStorage.getItem("currentUser");
const currentUsername = localStorage.getItem("currentUsername");

// Prevent hidden toasts from covering UI elements
$(".toast").hide();
$(".toast").on("hidden.bs.toast", function() {
    $(".toast").hide();
});

$(document).ready(function() {
    $("#currentUsername").val(currentUsername);
    $("#newUsername").val(currentUsername);

    // Fade in after rendering
    $("main")
        .hide()
        .removeClass("hidden")
        .fadeIn();
});

$("#updateUser").click(() => {
    // Generate salt
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newUsername = $("#newUsername").val();

    // Check if username is taken
    fetch("https://cop4331group7api.azurewebsites.net/dev/showtable/users")
        .then(res => {
            return res.text();
        })
        .then(data => {
            // Fetch usernames from string
            if(newUsername != currentUsername) {
                const usernames = /row = \d ([a-zA-Z]*) /gm;

                const matches = data.matchAll(usernames);
                for (const m of matches) {
                    if (m[1] === currentUsername) alert("User already exists!");
                    return false;
                }
            }
        }).then(() => {
            fetch("https://cop4331group7api.azurewebsites.net/users", {
                method: "POST",
                body: JSON.stringify({
                    'currentUsername': currentUsername,
                    'newUsername': newUsername,
                    'newPassword': md5($("#newPass").val() + salt),
                    'newSalt': salt
                })
            }).then(res => {
                $("#successToast")
                    .show()
                    .toast("show");
                $("#currentUsername").val(newUsername);
                $("#newUsername").val("");
                $("#currentPass").val("");
                $("#newPass").val("");
        
                localStorage.setItem("currentUsername", newUsername);
            });
        })
    
});

function logout(e) {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location = "index.html";
}
