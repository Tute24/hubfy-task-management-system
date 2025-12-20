import z from 'zod';

const loginBodySchema = z
  .object({
    email: z.email({ message: 'This is not a valid email address.' }),
    password: z.string().min(8, { message: 'The password must contain at leat 8 characters.' }),
  })
  .strict(); //o strict aqui do zod evita que a aplicação aceite um body que possua outros campos além de email e password

export default loginBodySchema;
