/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import * as yup from 'yup';

import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

class ProjectsService {
  constructor(repository) {
    this.projectsRepository = repository;
  }

  async getAllByFilter(title = '', userId) {
    const projects = await this.projectsRepository.getAll(title, userId);

    return projects;
  }

  async getOne(id) {
    // CONTRATO: PRECISO DE UM METODO QUE RECEBA UM ID E RETORNE UM PROJETO
    const project = await this.projectsRepository.getOne(id);

    return project;
  }

  async create(body, userId) {
    // Validar title e description
    const schema = yup.object().shape({
      title: yup.string().required('Required field').min(6, 'Mimimum of 6 charracters').max(50, 'Maximum of 50 charracters'),
      description: yup.string().required('Required field').min(15, 'Mimimum of 15 charracters').max(150, 'Maximum of 150 charracters'),
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

    const newProject = await this.projectsRepository.create(body, userId);

    return newProject;
  }
}

export default ProjectsService;
