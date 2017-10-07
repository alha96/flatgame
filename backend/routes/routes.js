/**
 * Created by ahatzold on 06.10.2017.
 */
module.exports = function(app) {
    var userController = require('../controllers/userController');

    //if the method is not expicitly named 'by_username"
    //then it uses the id
    app.route('/user')
        .get(userController.get_a_user_by_username)
        .post(userController.create_a_user);

    app.route('/user/:userid')
        .get(userController.get_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);

};