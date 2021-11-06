import mongoose from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException';

class ProjectsRepository {
  constructor(model) {
    this.projectModel = model;
  }

  async getAll(title) {
    const projects = await this.projectModel.find({ title: { $regex: new RegExp(title, 'i') } });

    return projects;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const project = await this.projectModel.findById(id);

    return project;
  }
}

export default ProjectsRepository;
