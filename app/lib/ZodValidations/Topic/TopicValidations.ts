import {z} from 'zod';


export const TopicSchema = z.object({
  title: z.string().nonempty().max(70),
  color: z.string().nonempty().max(9)
})

export const TopicUpdateSchema = z.object({
  id: z.number().nonnegative(),
  title: z.string().nonempty().max(70),
  color: z.string().nonempty().max(9)
})
