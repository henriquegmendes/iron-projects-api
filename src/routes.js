import { Router } from 'express';
import jwt from 'jsonwebtoken';

import projectsController from './controllers/projectsController';
import tasksController from './controllers/tasksController';
import authController from './controllers/authController';

import NotAuthenticatedException from './exceptions/NotAuthenticatedException';

const router = Router();

// Rotas Públicas
router.use('/auth', authController);// /api/auth

// Criar AQUI um middleware que verifica as credenciais do nosso user
router.use((req, res, next) => {
  // AQUI VAMOS RECEBER O ACCESS TOKEN E VALIDA-LO PARA AUTORIZAR O CLIENT A VER OS SEUS PROJETOS
  const bearerToken = req.get('Authorization');

  // Se foi passado este header
  if (!bearerToken) {
    return next(new NotAuthenticatedException());
  }

  // validar o token
  // const tokenPayload = jwt.verify();

  console.log('TOKENNNNNN', bearerToken);

  return next(new NotAuthenticatedException());
});

// Rotas Privadas
router.use('/projects', projectsController); // /api/projects
router.use('/tasks', tasksController); // /api/tasks

export default router;
