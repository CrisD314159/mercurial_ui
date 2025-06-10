import {z} from 'zod';


export const SubjectSchema = z.object({
  title: z.string().nonempty().max(70)
})

export const SubjectUpdateSchema = z.object({
  id: z.number().nonnegative(),
  title: z.string().nonempty().max(70)
})
