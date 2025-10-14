import type { LoginViewModel } from "../view-models/login-view-model";

interface LoginProps {
  viewModel: LoginViewModel;
}

export const LoginPage = ({ viewModel }: LoginProps) => {
  const { isLoading, error } = viewModel;

  if (isLoading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};
