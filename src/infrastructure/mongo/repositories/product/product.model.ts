import IProduct from '@/domain/models/product/product.model';
import {
  Schema,
  Document,
  model as mongooseModel,
  PaginateModel,
} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IProductDocument extends Document, Omit<IProduct, '_id'> {}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un género válido',
      },
    },
    images: [{ type: String }],
    inStock: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    tags: [{ type: String, trim: true }],
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} no es un size definido',
        },
      },
    ],
    type: [
      {
        type: String,
        enum: {
          values: ['shirts', 'pants', 'hoodies', 'hats'],
          message: '{VALUE} no es un tipo definido',
        },
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.plugin(paginate);

ProductSchema.index({ title: 'text', tags: 'text' });

const model = mongooseModel<IProductDocument, PaginateModel<IProductDocument>>(
  'Products',
  ProductSchema
);

export default model;
