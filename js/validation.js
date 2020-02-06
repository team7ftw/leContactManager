// Enforces mmddyyyy on birthdate field
// TODO: more validation
function validateForm() {
    const birthdateField = $("#birthday");
    const validDate = /(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d\d/;

    if(validDate.test(birthdateField.val()) === false) {
        // Reset the field
        birthdateField.val('');
        $(".invalid-feedback").remove();
        birthdateField.addClass('is-invalid');
        $("<div class='invalid-feedback'>Please use valid MMDDYY</div>").insertAfter(birthdateField);
        return false;
    }

    birthdateField.removeClass('is-invalid');
    $(".invalid-feedback").remove();
    return true;
}