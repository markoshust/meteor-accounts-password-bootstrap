Meteor.startup(function () {
    var smtp = {
        username: process.env.SMTP_USERNAME,
        password: process.env.SMTP_PASSWORD,
        server:   process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT
    };

    process.env.MAIL_URL = 'smtp://'
        + encodeURIComponent(smtp.username)
        + ':' + encodeURIComponent(smtp.password)
        + '@' + encodeURIComponent(smtp.server)
        + ':' + smtp.port;
});
