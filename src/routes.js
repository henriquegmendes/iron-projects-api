import { Router } from 'express';

import projectsController from './controllers/projectsController';
import tasksController from './controllers/tasksController';
import authController from './controllers/authController';

const router = Router();

router.use('/projects', projectsController); // /api/projects
router.use('/tasks', tasksController); // /api/tasks
router.use('/auth', authController);// /api/auth

export default router;
