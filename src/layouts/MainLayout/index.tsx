import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Outlet, useNavigation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 'auto',
        height: 1,
        width: 1,
        overflow: 'hidden'
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flex: 'auto',
          overflow: 'hidden',
          flexDirection: 'column'
        }}
      >
        <DrawerHeader />
        <Box
          sx={{
            display: 'flex',
            flex: 'auto',
            flexDirection: 'column',
            overflow: 'auto',
            height: 1,
            width: 1
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

export default MainLayout
