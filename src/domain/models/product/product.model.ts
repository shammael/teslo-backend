interface IProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: TSize[];
  slug: string;
  tags: string[];
  title: string;
  type: TType;
  gender: TGender;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export type TSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type TType = 'shirts' | 'pants' | 'hoodies' | 'hats';
export type TGender = 'men' | 'women' | 'kid' | 'unisex';

export default IProduct;
