import React, { type ReactNode } from "react";
import { ROUTES } from "./routes";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
// import AuthGuard from "./AuthGuard"; // Um componente para lidar com rotas privadas (Ex: verifica se está logado)

const AuthGuard = (props: { isPrivate: boolean; children: ReactNode }) => {
  const { isPrivate, children } = props;
  if (isPrivate) return <Navigate to="/login" />;
  return children;
};

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, element: Element, viewModel, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              <AuthGuard isPrivate={isPrivate}>
                <Element viewModel={viewModel} />
              </AuthGuard>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
