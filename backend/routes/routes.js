/**
 * Created by ahatzold on 06.10.2017.
 */
module.exports = function(app) {
    const userController = require('../controllers/userController');
    const flatController = require('../controllers/flatController');
    const taskController = require('../controllers/taskController');
    const authController = require('../controllers/authController');

    //if the method is not expicitly named 'by_username"
    //then it uses the id
    app.route('/user')
        .get(userController.get_user_by_username)
        .post(userController.create_user);

    app.route('/user/:userId')
        .get(userController.get_user)
        .put(userController.update_user)
        .delete(userController.delete_user);

    app.route('/flat')
        .post(flatController.create_flat);

    app.route('/flat/:flatId')
        .get(flatController.get_flat)
        .put(flatController.update_flat)
        .delete(flatController.delete_flat);

    app.route('/flat/:flatId/task')
        .get(flatController.get_all_tasks_of_flat)
        .post(flatController.create_task_in_flat);

    app.route('/flat/:flatId/user')
        .get(flatController.get_all_users_of_flat);

    app.route('/flat/:flatId/user/:userId')
        .put(flatController.modify_user_in_flat)
        .delete(flatController.delete_user_from_flat);

    app.route('/flat/:flatId/task/:taskId')
        .get(flatController.get_users_of_task);

    app.route('/task/:taskId')
        .get(taskController.get_task)
        .delete(taskController.delete_task);

    app.route('/token/oauth2')
        .post(authController.oAuth2_getToken);
};