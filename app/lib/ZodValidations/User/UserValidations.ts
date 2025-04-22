import {z} from 'zod'

export const UpdateUserSchema = z.object({
  name: z.string().nonempty().max(100)
})