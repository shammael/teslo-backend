import ProductRepository from './Product.repository';
const productRepository = new ProductRepository();
const createProductRepository = productRepository;
const getProductBySlugRepository = productRepository;
export { createProductRepository, getProductBySlugRepository };
