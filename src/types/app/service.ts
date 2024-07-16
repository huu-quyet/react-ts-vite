export type HttpResponse<D = any> = {
  data: D | null
  message: string | null
  messageCode: string | null
  success: boolean
  total: number
}
export type HttpErrorResponse = {
  Errors: string[]
  MessageCode: string | null
  HttpStatus: number
}
