import z from 'zod';

const updateTaskSchema = z.object({
  title: z
    .string({ message: 'Enter a valid title with at 2 least 2 characters.' })
    .min(2)
    .optional(),
  description: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional(),
});

export default updateTaskSchema;
