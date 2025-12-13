import z from 'zod';

const loginBodySchema = z
  .object({
    email: z.email({ message: 'This is not a valid email address.' }),
    password: z.string({ message: 'The password must contain at leat 8 characters.' }).min(8),
  })
  .strict(); //o strict aqui do zod evita que a aplicação aceite um body que possua outros campos além de email e password

export default loginBodySchema;
