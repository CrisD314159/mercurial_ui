import {z} from 'zod'

export const UpdateUserSchema = z.object({
  name: z.string().nonempty().max(100)
})


export const SignUpSchema = z.object({
  name: z.string().nonempty().max(100),
  password: z.string().nonempty(),
  email: z.string().email()
})

export const ChangePasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().nonempty(),
  password: z.string().nonempty()
})