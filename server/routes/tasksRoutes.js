const { Router } = require('express');
const tasksController = require('../controller/tasksController');
const requireAuth = require('../middleware/requireAuth');

const router = Router();

router.use(requireAuth);

router.get('/getTasks/:task', tasksController.getTasks);
router.get('/getAllTasks', tasksController.getAllTasks);
router.get('/getAllTasksToday', tasksController.getAllTasksToday);
router.post('/createTask', tasksController.createTask);
router.delete('/deleteTask/:taskId', tasksController.deleteTask);
router.patch('/updateStateTask', tasksController.updateStateTask);

module.exports = router;