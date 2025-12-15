import z from 'zod';

const updateTaskSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Enter a valid title with at 2 least 2 characters.' })
    .optional(),
  description: z.string().optional(),
  status: z
    .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'], {
      message: `Values must only be 'PENDING', 'IN_PROGRESS' or 'COMPLETED'`,
    })
    .optional(),
});

export default updateTaskSchema;
