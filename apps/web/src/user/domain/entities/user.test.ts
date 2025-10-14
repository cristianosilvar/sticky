import { BaseEntity } from "@/shared/domain/base-entity";
import { UserEntity } from "./user";

const mockId = "uuid-test-123";
const mockCreatedAt = new Date("2025-01-01T10:00:00Z");
const mockUpdatedAt = new Date("2025-01-01T10:00:00Z");
const mockName = "Alice Silva";
const mockEmail = "alice.silva@teste.com";

describe("UserEntity", () => {
  it("should create an instance of UserEntity and inherit BaseEntity properties correctly", () => {
    const user = new UserEntity(
      mockId,
      mockCreatedAt,
      mockUpdatedAt,
      mockName,
      mockEmail
    );

    expect(user).toBeInstanceOf(UserEntity);
    expect(user).toBeInstanceOf(BaseEntity);
    expect(user.id).toBe(mockId);
    expect(user.createdAt).toEqual(mockCreatedAt);
    expect(user.updatedAt).toEqual(mockUpdatedAt);
  });

  it("should set the User properties (name and email) correctly upon creation", () => {
    const user = new UserEntity(
      mockId,
      mockCreatedAt,
      mockUpdatedAt,
      mockName,
      mockEmail
    );

    expect(user.name).toBe(mockName);
    expect(user.email).toBe(mockEmail);
  });
});
