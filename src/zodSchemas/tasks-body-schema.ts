import z from 'zod';

const tasksSchema = z.array(
  z.object({
    title: z.string({ message: 'Enter a valid title with at 2 least 2 characters.' }).min(2),
    description: z.string().optional(),
  }),
);

const tasksBodySchema = z
  .object({
    tasks: tasksSchema,
  })
  .strict();

export default tasksBodySchema;
