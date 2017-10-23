/**
 * Created by ahatzold on 06.10.2017.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const flatController = require('../controllers/flatController');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

//if the method is not expicitly named 'by_username"
//then it uses the id
router.route('/user')
    .get(userController.get_user_by_username)
    .post(userController.create_user);

router.route('/user/:userId')
    .get(userController.get_user)
    .put(userController.update_user)
    .delete(userController.delete_user);

router.route('/flat')
    .post(flatController.create_flat);

router.route('/flat/:flatId')
    .get(flatController.get_flat)
    .put(flatController.update_flat)
    .delete(flatController.delete_flat);

router.route('/flat/:flatId/task')
    .get(flatController.get_all_tasks_of_flat)
    .post(flatController.create_task_in_flat);

router.route('/flat/:flatId/user')
    .get(flatController.get_all_users_of_flat);

router.route('/flat/:flatId/user/:userId')
    .put(flatController.modify_user_in_flat)
    .delete(flatController.delete_user_from_flat);

router.route('/flat/:flatId/task/:taskId')
    .get(flatController.get_users_of_task);

router.route('/task/:taskId')
    .get(taskController.get_task)
    .delete(taskController.delete_task);

router.route('/auth/oauth2/:provider')
    .get(authController.oAuth2_redirect);
router.route('/auth/oauth2/google/callback')
    .get(authController.oAuth2_handle_google);

module.exports = router;