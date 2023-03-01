/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { RequestValidationError } from '@/application/errors';
import IController from '@/application/ports/controller/controller';
import IResponseHander from '@/application/ports/response/response-handler';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { objectKeyExists } from '@/common/helpers/object/object-key-exist';
import IProduct, {
  TGender,
  TSize,
  TType,
} from '@/domain/models/product/product.model';
import { createProductRequestValidatorAdapter } from '@/infrastructure/zod/adapters';
import slugify from '@/common/slugify';
import { ICreateProductUseCase } from '@/domain/use-cases';
import TCreateProductRequest from '@/domain/requests/product/create-product.request';

class CreateProductController implements IController<IProduct | never> {
  constructor(
    private readonly createProductUseCase: ICreateProductUseCase,
    private readonly presenter: IResponseHander<IProduct>
  ) {}

  async handleRequest(requestModel: TCreateProductRequest) {
    if (!objectKeyExists(requestModel, 'body')) {
      throw new RequestValidationError('Body is missing');
    }

    // console.log(requestModel.body);

    const {
      description,
      gender,
      images,
      inStock,
      price,
      sizes,
      tags,
      title,
      type,
    } = requestModel.body;

    const sanitizeBody = {
      body: {
        description: this.sanitize('description', description),
        gender: this.sanitize('gender', gender) as TGender,
        inStock: parseInt(this.sanitize('inStock', inStock), 10),
        price: parseInt(this.sanitize('price', price), 10),
        title: this.sanitize('title', title),
        type: this.sanitize('type', type) as TType,
        images: JSON.parse(this.sanitize('images', images)) as string[],
        sizes: JSON.parse(this.sanitize('sizes', sizes)) as TSize[],
        tags: JSON.parse(this.sanitize('tags', tags)) as string[],
        slug: slugify(this.sanitize('title', title)),
      },
    };

    const result = createProductRequestValidatorAdapter(sanitizeBody);

    const productDB = await this.createProductUseCase.create(result?.body!);
    return this.presenter.response({ body: productDB });
  }

  private sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default CreateProductController;
