import { createContext, useEffect, useReducer } from 'react'

import type { Dispatch } from 'react'
import type { FCC } from '@src/types'

import { __DEV__ } from '@src/config'
import useRefresh from '@src/hooks/useRefresh'
import { signIn, signOut } from '@src/services'
import SessionStorage from '@src/utils/SessionStorage'

type Login = typeof signIn
type Logout = typeof signOut
type Register = () => Promise<void>

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: any | null
  permissions: any[]
}

export interface AuthContextStateValue extends State {
  login: Login
  logout: Logout
  register: Register
}

type Action =
  | {
      type: 'AUTHORIZED'
      payload: {
        user: any | null
        permissions: any[]
      }
    }
  | { type: 'UNAUTHORIZED' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: { user: any } }

const initialState: State = {
  isAuthenticated: true,
  isInitialized: true,
  user: null,
  permissions: []
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'AUTHORIZED': {
      const { user, permissions } = action.payload
      return {
        isInitialized: true,
        isAuthenticated: true,
        permissions,
        user
      }
    }
    case 'UNAUTHORIZED': {
      return {
        isInitialized: true,
        isAuthenticated: false,
        user: null,
        permissions: []
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        permissions: []
      }
    }
    case 'REGISTER': {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user
      }
    }
    default:
      return state
  }
}

const AuthContextState = createContext<AuthContextStateValue | null>(null)
const AuthContextDispatch = createContext<Dispatch<Action> | null>(null)

if (__DEV__) {
  AuthContextState.displayName = 'AuthContext'
}

const AuthProvider: FCC = (props) => {
  const { children } = props
  const [refresh, refetch] = useRefresh()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const accessToken = SessionStorage.get('mbfAccessToken')

    if (accessToken) {
      // TODO: Fetch user data
    }
  }, [refresh])

  const login: Login = async (params) => {
    const response = await signIn(params)

    const { token, userId, refreshToken } = response

    if (token && refreshToken && userId) {
      SessionStorage.set('mbfAccessToken', token)
      SessionStorage.set('mbfRefreshToken', refreshToken)
      SessionStorage.set('mbfUserId', userId)
      refetch()
    }

    return response
  }

  const logout: Logout = async () => {
    const response = await signOut()
    SessionStorage.clear()

    dispatch({ type: 'LOGOUT' })

    return response
  }

  const register: Register = async (): Promise<void> => {
    // Register
  }

  return (
    <AuthContextState.Provider value={{ ...state, login, logout, register }}>
      <AuthContextDispatch.Provider value={dispatch}>{children}</AuthContextDispatch.Provider>
    </AuthContextState.Provider>
  )
}

const AuthConsumer = AuthContextState.Consumer
export { AuthContextState as default, AuthProvider, AuthConsumer, AuthContextDispatch }
