/**
 * Created by ahatzold on 06.10.2017.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const flatController = require('../controllers/flatController');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const absenceController = require('../controllers/absenceController');
const authMiddleware = require('../middleware/authMiddleware');

//if the method is not expicitly named 'by_username"
//then it uses the id
router.route('/user')
    .get(userController.get_user_by_username);
//    .post(userController.create_user);

router.route('/user/:userId')
    .all(authMiddleware.authenticate)
    .get(userController.get_user)
    .put(userController.update_user)
    .delete(userController.delete_user);

router.route('/user/:userId/absence')
    .all(authMiddleware.authenticate)
    .post(absenceController.create_absence)
    .get(absenceController.get_absence);

router.route('/user/:userId/absence/:absenceId')
    .all(authMiddleware.authenticate)
    .delete(absenceController.delete_absence);

router.route('/flat')
    .all(authMiddleware.authenticate)
    .post(flatController.create_flat);

router.route('/flat/:flatId')
    .all(authMiddleware.authenticate)
    .get(flatController.get_flat)
    .put(flatController.update_flat)
    .delete(flatController.delete_flat);

router.route('/flat/:flatId/user')
    .all(authMiddleware.authenticate)
    .get(flatController.get_all_users_of_flat);

router.route('/flat/:flatId/user/:userId')
    .all(authMiddleware.authenticate)
    .put(flatController.modify_user_in_flat)
    .delete(flatController.delete_user_from_flat);

router.route('/flat/:flatId/task')
    .all(authMiddleware.authenticate)
    .get(flatController.get_tasks_done);

router.route('/flat/:flatId/task/:taskId')
    .all(authMiddleware.authenticate)
    .post(flatController.set_task_done);

router.route('/task')
    .all(authMiddleware.authenticate)
    .get(taskController.get_all_tasks)
    .post(taskController.create_task);

router.route('/task/:taskId')
    .all(authMiddleware.authenticate)
    .get(taskController.get_task)
    .delete(taskController.delete_task);

router.route('/auth/oauth2/:provider')
    .get(authController.oAuth2_redirect);

router.route('/auth/oauth2/google/callback')
    .get(authController.oAuth2_handle_google);

router.route('/auth/session')
    .all(authMiddleware.authenticate)
    .get(authController.get_current_user)
    .delete(authController.destroy_session);

module.exports = router;