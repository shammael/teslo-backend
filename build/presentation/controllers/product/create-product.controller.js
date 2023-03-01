var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RequestValidationError } from '@/application/errors';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { objectKeyExists } from '@/common/helpers/object/object-key-exist';
class CreateProductController {
    constructor(createProductRepository, presenter) {
        this.createProductRepository = createProductRepository;
        this.presenter = presenter;
    }
    handleRequest(requestModel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!objectKeyExists(requestModel, 'body')) {
                throw new RequestValidationError('Body is missing');
            }
            const { description, gender, images, inStock, price, sizes, slug, tags, title, type, } = requestModel.body;
            const sanitizeBody = {
                description: this.sanitize(description),
                gender: this.sanitize(gender),
                inStock: parseInt(this.sanitize(inStock), 10),
                price: parseInt(this.sanitize(price), 10),
                slug: this.sanitize(slug),
                title: this.sanitize(title),
                type: this.sanitize(type),
                images: JSON.parse(this.sanitize(images)),
                sizes: JSON.parse(this.sanitize(sizes)),
                tags: JSON.parse(this.sanitize(tags)),
            };
            const productDB = yield this.createProductRepository.create(sanitizeBody);
            return this.presenter.response(productDB);
        });
    }
    sanitize(value) {
        return sanitizerSingleton.sanitize(value);
    }
}
export default CreateProductController;
