/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import mongoose from 'mongoose';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
import InvalidIdException from '../exceptions/InvalidIdException';

class TasksService {
  constructor(taskRepository, projectRepository) {
    this.taskRepository = taskRepository;
    this.projectRepository = projectRepository;
  }

  async getTasksByProjectId(projectId) {
    const isIdValid = mongoose.isValidObjectId(projectId);

    if (!isIdValid) {
      throw new InvalidIdException();
    }

    const tasks = await this.taskRepository.getTasksByProjectId(projectId);

    return tasks;
  }

  async create(body, projectId) {
    const schema = yup.object().shape({
      title: yup.string().required('Required Field').min(6, 'Minimum of 6 characters').max(50, 'Maximum of 50 characters'),
      description: yup.string().required('Required Field').min(15, 'Minimum of 15 characters').max(150, 'Maximum of 150 characters'),
    });

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0],
      }));

      throw new InvalidBodyRequestException(errors);
    }

    const isIdValid = mongoose.isValidObjectId(projectId);

    if (!isIdValid) {
      throw new InvalidIdException();
    }

    const savedTask = await this.taskRepository.createNewTask({ ...body, project: projectId });

    // Aqui em baixo temos acesso ao _id da nova task
    // Precisa pegar o projeto pelo ID e inserir dentro de tasks o ID da tarefa criada acima
    await this.projectRepository.insertTaskId(projectId, savedTask._id);

    return savedTask;
  }
}

export default TasksService;
