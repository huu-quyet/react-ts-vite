import { EndPoints } from '@src/constants/paths'
import HttpClient from '@src/utils/HttpClient'

// Sign in with email and password
interface SignInParams {
  userName: string
  password: string
}

interface SignInResponse {
  refreshToken: string
  token: string
  userId: number
  name: string
}

export const signIn = async (params: SignInParams) => {
  return HttpClient.post<typeof params, SignInResponse>(EndPoints.auth.login, params)
}

// Sign out
export const signOut = async () => {
  return HttpClient.post(EndPoints.auth.logout)
}
