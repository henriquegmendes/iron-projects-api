class AuthService {
  constructor(repository) {
    this.authRepository = repository;
  }

  async register(body) {
    // Validação de todos os campos enviados (campos obrigatórios, min/max caracteres, formato, etc)
    // Validar se o email já não está em uso
    // Cria novo modelo de user

    // .... CONTINUA DPS DO ALMOÇO!!!!

    // CHAMAR O REPOSITORY PASSANDO OS DADOS DE CADASTRO PARA QUE ELE SALVE O USER NO BANCO
  }

  async authenticate() {
    // Serviço que loga e entrega o access token para o user
  }
}

export default AuthService;
