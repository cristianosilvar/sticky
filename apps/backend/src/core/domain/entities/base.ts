export abstract class BaseEntity<T> {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;
  protected props: T;

  protected constructor(props: T, id?: string, createdAt?: Date, updatedAt?: Date) {
    this.props = props;
    this.id = id || this.generateId();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  protected touch(): void {
    this.updatedAt = new Date();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
