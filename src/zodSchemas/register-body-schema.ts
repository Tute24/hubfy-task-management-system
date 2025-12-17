import z from 'zod';

const registerBodySchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 letters long!' }),
    email: z.email({ message: 'Not a valid email address!' }),
    password: z
      .string()
      .min(8, { message: 'Not a valid password, must contain at leat 8 charachters!' }),
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match!',
  }); //o strict aqui do zod evita que a aplicação aceite um body que possua outros campos além dos 4 estabelecidos

export default registerBodySchema;
