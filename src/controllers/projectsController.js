import { Router } from 'express';

import Project from '../models/Project';
import ProjectsService from '../service/projectsService';
import ProjectsRepository from '../repository/projectsRepository';

const router = Router();

// Injeção de Dependências
const projectsRepository = new ProjectsRepository(Project);
const projectsService = new ProjectsService(projectsRepository);

// Inserir rotas de projects

// RECEBER O REQUEST, PEGAR DELE O QUE É UTIL, E MANDAR A RESPOSTA
router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;

    const projects = await projectsService.getAllByFilter(title);

    res.json(projects);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectsService.getOne(id);

    res.json(project);
  } catch (error) {
    console.log(error);
  }
});

export default router;
