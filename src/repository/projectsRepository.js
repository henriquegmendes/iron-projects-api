import mongoose from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException';

class ProjectsRepository {
  constructor(model) {
    this.projectModel = model;
  }

  async getAll(title, userId) {
    const projects = await this.projectModel.find({
      title: { $regex: new RegExp(title, 'i') },
      owner: userId,
    });

    return projects;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const project = await this.projectModel.findById(id).populate('tasks');

    return project;
  }

  async create(body, userId) {
    const newProject = await this.projectModel.create({ ...body, owner: userId });

    return newProject;
  }

  async insertTaskId(projectId, taskId) {
    await this.projectModel.findByIdAndUpdate(projectId, { $push: { tasks: taskId } });
  }
}

export default ProjectsRepository;
