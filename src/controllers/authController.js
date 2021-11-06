import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const router = Router();

// Injeção de dependencias
const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);

    res.json(newUser);
    // lógica para receber os dados de cadastro, validá-los e por fim guardar os dados no banco
  } catch (error) {
    next(error);
  }
});

router.post('/login', (req, res, next) => {
  try {
    // lógica para receber email + senha do user e valida-os para então devolver um ACCESS TOKEN
  } catch (error) {
    next(error);
  }
});

export default router;
