class ProjectsRepository {
  constructor(model) {
    this.projectModel = model;
  }

  async getAll(title) {
    const projects = await this.projectModel.find({ title: { $regex: new RegExp(title, 'i') } });

    return projects;
  }

  async getOne(id) {
    console.log(id);
    const project = await this.projectModel.findById(id);

    console.log(project);

    return project;
  }
}

export default ProjectsRepository;
