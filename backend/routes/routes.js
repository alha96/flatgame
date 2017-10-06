/**
 * Created by ahatzold on 06.10.2017.
 */
module.exports = function(app) {
    var userController = require('../controllers/userController');

    app.route('/user')
        .post(userController.create_a_user);
};