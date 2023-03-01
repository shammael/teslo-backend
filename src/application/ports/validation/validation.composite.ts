abstract class ValidationComposite<T = unknown> {
  protected validations: ValidationComposite[] = [];
  abstract validate(request: T): Promise<void> | never;

  add(...validations: ValidationComposite[]) {
    validations.forEach((validation) => {
      this.validations.push(validation);
    });
  }
}

export default ValidationComposite;
