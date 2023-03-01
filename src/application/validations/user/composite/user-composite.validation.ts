import { InternalServerError } from '@/application/errors';
import ValidationComposite from '@/application/ports/validation/validation.composite';
import { TCreateProductRequestBody } from '@/domain/requests/product';

class UserCompositeValidation extends ValidationComposite<TCreateProductRequestBody> {
  async validate(request: TCreateProductRequestBody): Promise<void> | never {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations');
    }
    await Promise.all(
      this.validations.map(async (validation) => {
        await validation.validate(request);
      })
    );
  }
}

export default UserCompositeValidation;
