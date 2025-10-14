import { buildAuthContext } from "./builders/auth-builder";

export const Auth = buildAuthContext();

export const DI_CONTAINER = {
  Auth,
};
