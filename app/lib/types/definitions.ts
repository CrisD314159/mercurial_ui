

export const APIURL = "http://localhost:8080/api"

export type FormState = 
  | {
    errors?: {
      name?: string []
      email?: string[]
      password?: string[]
    }
    message?: string
    success?: boolean
    }
  | undefined


export function isNullOrEmpty(value:string |null | undefined) : boolean {
  return !value || value.trim().length === 0
}