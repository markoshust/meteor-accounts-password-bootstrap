Template.auth.events({
    'click .show-login': function() {
        Session.set('showLogin', !Session.get('showLogin'));
        Session.set('showRegister', false);
        Session.set('showForgotPassword', false);
    },
    'click .show-register': function() {
        Session.set('showLogin', false);
        Session.set('showRegister', !Session.get('showRegister'));
        Session.set('showForgotPassword', false);
    }
});

Template.auth.helpers({
    showLogin: function() {
        return Session.get('showLogin');
    },
    showRegister: function() {
        return Session.get('showRegister');
    },
    showForgotPassword: function() {
        return Session.get('showForgotPassword');
    }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();

        var email = event.target.email.value,
            password = event.target.password.value;

        Meteor.loginWithPassword(email, password, function(err) {
            Session.set('loginError', (err && err.reason) ? err.reason : null);
        });
    },
    'click .forgot-password': function() {
        Session.set('showLogin', false);
        Session.set('showRegister', false);
        Session.set('showForgotPassword', true);
    }
});

Template.login.helpers({
    loginError: function(){
        return Session.get('loginError');
    }
});

Template.register.events({
    'submit form': function(event) {
        event.preventDefault();

        var email = event.target.email.value,
            password = event.target.password.value,
            confirm = event.target.confirm.value;

        if (!isEmail(email)) {
            Session.set('registerError', 'Invalid email address');
            return;
        }

        if (!isValidPassword(password)) {
            Session.set('registerError', 'Invalid password');
            return;
        }

        if (!doPasswordsMatch(password, confirm)) {
            Session.set('registerError', 'Passwords don\'t match');
            return;
        }

        Accounts.createUser({
            email: email,
            password: password
        }, function(err) {
            Session.set('registerError', (err && err.reason) ? err.reason : null);
        });
    }
});

Template.register.helpers({
    registerError: function(){
        return Session.get('registerError');
    }
});

Template.loggedIn.events({
    'click .logout': function() {
        Meteor.logout();
    }
});

Template.forgotPassword.events({
    'submit form': function(event) {
        event.preventDefault();

        var email = event.target.email.value;

        if (!isEmail(email)) {
            Session.set('forgotPasswordError', 'Invalid email address');
            return;
        }

        Session.set('forgotPasswordError', 'Please wait');

        Accounts.forgotPassword({email: email}, function(err) {
            if (err) {
                if (err.message === 'User not found [403]') {
                    Session.set('forgotPasswordError', 'Email doesn\'t exist');
                } else {
                    Session.set('forgotPasswordError', 'Unknown error');
                }
            } else {
                Session.set('forgotPasswordError', 'Email sent');
            }
        });
    },
    'click .forgot-password-back': function() {
        Session.set('showLogin', false);
        Session.set('showRegister', false);
        Session.set('showForgotPassword', false);
    }
});

Template.forgotPassword.helpers({
    forgotPasswordError: function(){
        return Session.get('forgotPasswordError');
    }
});
