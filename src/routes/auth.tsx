import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import type { RouteObject } from 'react-router-dom'

import AuthLayout from '@src/layouts/AuthLayout'
import PublicRoute from '@src/components/core/PublicRoute'
import { EndPoints } from '@src/constants/paths'

const authRoutes: RouteObject = {
  path: 'auth',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Navigate to={EndPoints.auth.login} />
    },
    {
      path: EndPoints.auth.login,
      element: (
        <PublicRoute>
          <div>Login</div>
        </PublicRoute>
      )
    },
    {
      path: EndPoints.auth.register,
      element: <div>Register</div>
    },
    {
      path: EndPoints.auth.resetPassword,
      element: <div></div>
    },
    {
      path: EndPoints.auth.forgotPassword,
      element: <div></div>
    }
  ]
}

export default authRoutes
