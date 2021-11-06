class ProjectsService {
  constructor(repository) {
    this.projectsRepository = repository;
  }

  async getAllByFilter(title = '') {
    const projects = await this.projectsRepository.getAll(title);

    return projects;
  }

  async getOne(id) {
    // CONTRATO: PRECISO DE UM METODO QUE RECEBA UM ID E RETORNE UM PROJETO
    const project = await this.projectsRepository.getOne(id);

    return project;
  }
}

export default ProjectsService;
