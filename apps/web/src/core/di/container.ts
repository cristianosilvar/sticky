import { buildUserContext } from "./builders/user-builder";

export const User = buildUserContext();

export const DI_CONTAINER = {
  User,
};
