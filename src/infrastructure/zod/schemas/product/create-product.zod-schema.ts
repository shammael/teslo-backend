/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import zod from 'zod';

const createProductSchema = zod.object({
  body: zod.object({
    description: zod.string({
      required_error: 'La descripción es requerida',
    }),
    images: zod.array(
      zod.string({ required_error: 'La url del imagen es requerida' })
    ),
    price: zod.number({
      required_error: 'Tienes que pasar el precio del producto',
    }),
    sizes: zod.array(
      zod.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'], {
        required_error: 'Es requerido un size válido',
      })
    ),
    tags: zod.array(
      zod.string({ required_error: 'El nombre del tag es requerido' }).min(3)
    ),
    title: zod.string({ required_error: 'El título es requerido' }).min(5),
    type: zod.enum(['shirts', 'pants', 'hoodies', 'hats'], {
      required_error: 'Es requerido un tipo válido',
    }),
    gender: zod.enum(['men', 'women', 'unisex'], {
      required_error: 'Es requerido un género válidoo',
    }),
    inStock: zod.number({
      required_error: 'Debes especificar cuanto hay en stock',
    }),
    slug: zod.string({ required_error: 'El slug es requerido' }).min(3),
  }),
});

export default createProductSchema;
