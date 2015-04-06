trimInput = function(value) {
    return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
    return value && value !== '';
};

isEmail = function(value) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return filter.test(value);
};

isValidPassword = function(password) {
    return password.length > 6;
};

doPasswordsMatch = function(password, confirm) {
    return password == confirm;
};
