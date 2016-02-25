/**
 * 创建用户
 * @type {exports|module.exports}
 */

var app = require('./app');
var models = require('./models');

models.User.register({
    email: 'alex@example.242433',
    password: '23434',
    password_reset_token: "password_reset_toke2323n2"
}, function (err, reply, c, d) {

    console.error(err);
    console.log(reply);
    console.log(c)
    console.log(d)


    models.OAuthClientsModel.create({
        clientId: 'papers3',
        clientSecret: '123',
        redirectUri: '/oauth/redirect'
    }, function () {
        process.exit();
    });
});
