import IProduct from './product.model';

export type TCreateProduct = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;
export type TUpdateProduct = Omit<
  IProduct,
  'id' | 'createdAt' | 'UpdatedAt' | 'slug'
>;
