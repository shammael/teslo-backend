var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProductModel from './product.model';
class ProductRepository {
    find(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield ProductModel.findOne({ slug }).lean();
            return product;
        });
    }
    create({ description, gender, images, inStock, price, sizes, slug, tags, title, type, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new ProductModel({
                title,
                type,
                description,
                gender,
                images,
                inStock,
                price,
                slug,
                tags,
                sizes,
            });
            const result = yield product.save();
            return result;
        });
    }
}
export default ProductRepository;
