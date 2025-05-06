import {z} from 'zod'

export const AssignmentSchema = z.object({
  title: z.string(),
  subjectId: z.number().positive(),
  topicId: z.number().positive(),
  noteContent: z.string(),
  dueDate: z.date()
})

export const AssignmentUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  subjectId: z.number().positive(),
  topicId: z.number().positive(),
  noteContent: z.string(),
  dueDate: z.date()
})