import zod from 'zod';

const loginSchema = zod.object({
  email: zod
    .string({ required_error: 'El correo debe de ser de tipo string' })
    .email('No es un correo válido'),
  password: zod
    .string({
      required_error: 'La contraseña debe de tener el formato válido',
    })
    .min(6, 'Credentiales no válidas'),
});

export default loginSchema;
