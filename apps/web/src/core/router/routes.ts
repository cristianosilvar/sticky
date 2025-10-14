// 1. Importa todas as Views dos Bounded Contexts

import { LoginPage } from "@/auth/presentation/views/login";
import { DI_CONTAINER } from "../di/container";

interface AppRoute {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: React.FC<any>;
  viewModel: unknown;
  isPrivate: boolean;
}

export const ROUTES: AppRoute[] = [
  {
    path: "/login",
    element: LoginPage,
    viewModel: DI_CONTAINER.Auth.viewModels,
    isPrivate: false,
  },
];
