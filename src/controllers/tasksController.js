import { Router } from 'express';

import TaskService from '../service/tasksService';

import Project from '../models/Project';
import Task from '../models/Task';

import TasksRepository from '../repository/tasksRepository';
import ProjectRepository from '../repository/projectsRepository';

// Injeção de Dependencias
const taskRepository = new TasksRepository(Task);
const projectRepository = new ProjectRepository(Project);
const taskService = new TaskService(taskRepository, projectRepository);

const router = Router();

router.get('/:projectId', async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const tasks = await taskService.getTasksByProjectId(projectId);

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/:projectId', async (req, res, next) => {
  try {
    const { body } = req;
    const { projectId } = req.params;

    const savedTask = await taskService.create(body, projectId);
    // Podemos movê-lo para o projectepository

    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
});

export default router;
