import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import RouteError from '@src/components/core/RouteError'
import MainLayout from '@src/layouts/MainLayout'
import PrivateRoute from '@src/components/core/PrivateRoute'
import { EndPoints } from '@src/constants/paths'

const mainRoutes: RouteObject = {
  path: EndPoints.home,
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  errorElement: <RouteError />,
  children: [
    {
      errorElement: <RouteError />,
      children: [
        {
          index: true,
          element: <div>Dashboard</div>
        }
      ]
    }
  ]
}

export default mainRoutes
