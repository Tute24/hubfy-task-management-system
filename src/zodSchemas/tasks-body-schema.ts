import z from 'zod';

const tasksSchema = z.array(
  z.object({
    title: z.string().min(2, { message: 'Enter a valid title with at least 2 characters.' }),
    description: z.string().optional(),
  }),
);

const tasksBodySchema = z
  .object({
    tasks: tasksSchema,
  })
  .strict();

export default tasksBodySchema;
