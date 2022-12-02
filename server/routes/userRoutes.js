const { Router } = require('express');
// const requireAuth = require('../middleware/requireAuth');
const userController = require('../controller/userController');

const router = Router();

// router.use(requireAuth);

router.post('/getUser', userController.getUser);
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.post('/checkPassword', userController.checkPassword);
router.post('/changePassword', userController.changePassword)

module.exports = router;