export function buildAuthContext() {
  //   // 1. INFRAESTRUTURA (Dependência 0: Constrói as classes concretas)
  //   const userRepository = new ApiUserRepository(); // Implementa IUserRepository

  //   // 2. DOMÍNIO (Depende de Repositórios - Interfaces)
  //   // O Domain Service recebe a implementação concreta do repositório
  //   const userRegistrationService = new UserRegistrationService(userRepository);

  //   // 3. APLICAÇÃO (Depende de Domain Services/Repositórios)
  //   const createUserApplicationService = new CreateUserApplicationService(
  //     userRegistrationService
  //   );

  //   // 4. APRESENTAÇÃO (Depende de Application Services)
  //   const userRegistrationViewModel = new UserRegistrationViewModel(
  //     createUserApplicationService
  //   );

  return {
    viewModels: {
      //   userRegistrationViewModel,
      // ... outros view models
    },
    // Opcional: exportar serviços/repositórios para uso em outros contextos ou testes
  };
}
