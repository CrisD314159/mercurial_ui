import {z} from 'zod'

export const UpdateUserSchema = z.object({
  name: z.string().nonempty().max(10)
})


export const SignUpSchema = z.object({
  name: z.string().nonempty().max(10),
  password: z.string().nonempty(),
  email: z.string().email()
})

export const ChangePasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().nonempty(),
  password: z.string().nonempty()
})

export const VerifyAccountSchema = z.object({
  email: z.string().email(),
  code: z.string().nonempty()
})