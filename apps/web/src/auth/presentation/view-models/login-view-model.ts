import { makeAutoObservable } from "mobx";

// import type { LoginUseCase } from "@/domain/auth/use-cases/login";

class LoginViewModel {
  isLoading: boolean = false;
  error: Error | null = null;
  //   private loginUseCase: LoginUseCase;

  constructor() {
    //loginUseCase: LoginUseCase
    // this.loginUseCase = loginUseCase;
    makeAutoObservable(this);
  }

  //   async handleLogin(params: any): Promise<void> {
  //     this.isLoading = true;
  //     this.error = null;
  //     try {
  //       this.users = await this.loginUseCase.execute(params);
  //     } catch (err) {
  //       this.error = err as Error;
  //     } finally {
  //       this.isLoading = false;
  //     }
  //   }
}

export { LoginViewModel };
