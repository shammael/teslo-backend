import { Schema, model as mongooseModel, } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
const ProductSchema = new Schema({
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
}, { timestamps: true });
ProductSchema.plugin(paginate);
const model = mongooseModel('Products', ProductSchema);
export default model;
