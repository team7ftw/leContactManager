// Enforces mmddyyyy on birthdate field
function validateForm() {
    const birthdateField = $('#birthday');
    const fnameField = $('#firstName');
    const lnameField = $('#lastName');
    const phoneField = $('#phone');
    const emailField = $('#address');

    // Valid regex
    const validDate = /(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d\d/;

    // Invalid regex
    const emptyString = /(^$|^\s*$)/;

    var valid = true;

    // Birthdate validation
    if (
        emptyString.test(birthdateField.val()) === false &&
        validDate.test(birthdateField.val()) === false
    ) {
        // Reset the field
        setInvalid(birthdateField, 'Please use valid MMDDYY');
        valid = false;
    } else {
        setValid(birthdateField);
    }

    // Name validation
    if (emptyString.test(fnameField.val()) === true) {
        setInvalid(fnameField, 'Please enter a first name');
        valid = false;
    } else {
        setValid(fnameField);
    }

    if (emptyString.test(lnameField.val()) === true) {
        setInvalid(lnameField, 'Please enter a last name');
        valid = false;
    } else {
        setValid(lnameField);
    }

    // Are further validations necessary?

    return valid;
}

function setInvalid(e, message) {
    e.val('');
    $('#invalid-' + e.attr('id')).remove();
    e.addClass('is-invalid');
    $(
        '<div class="invalid-feedback" id="invalid-' +
            e.attr('id') +
            '">' +
            message +
            '</div>'
    ).insertAfter(e);
}

function setValid(e) {
    $('#invalid-' + e.attr('id')).remove();
    e.removeClass('is-invalid');
}
