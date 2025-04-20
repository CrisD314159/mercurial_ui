

export const APIURL = "http://localhost:5066"

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


export type GeneralFormState = 
  | {
    errors?: string
    success?: boolean
    }
  | undefined


export type GenericError =
  |{
    success:boolean
    message:string
  }| undefined


export function isNullOrEmpty(value:string |null | undefined) : boolean {
  return !value || value.trim().length === 0
}