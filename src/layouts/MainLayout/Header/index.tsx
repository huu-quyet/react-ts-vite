import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { styled, useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'

import { toggleMobileOpen, toggleSidebarOpen } from '@src/slices/menu'
import { useTypedDispatch, useTypedSelector } from '@src/store'
import Account from './Account'

const Header = () => {
  const theme = useTheme()
  const dispatch = useTypedDispatch()
  const sidebarOpen = useTypedSelector((state) => state.menu.sidebarOpen)
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarOpen())
  }

  const handleToggleMobileOpen = () => {
    dispatch(toggleMobileOpen())
  }

  const content = (
    <Toolbar>
      <IconButton size='medium' edge='start' onClick={lgUp ? handleToggleSidebar : handleToggleMobileOpen}>
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <Stack>
        <Account />
      </Stack>
    </Toolbar>
  )

  if (lgUp) {
    return (
      <CollapsibleAppBar position='fixed' open={sidebarOpen} enableColorOnDark>
        {content}
      </CollapsibleAppBar>
    )
  }

  return (
    <NormalAppBar position='fixed' enableColorOnDark>
      {content}
    </NormalAppBar>
  )
}

const NormalAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}))

const CollapsibleAppBar = styled(AppBar, {
  shouldForwardProp: (prop: string) => !['open'].includes(prop)
})<{ open: boolean }>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(8.5)} + 1px)`
    }
  }),
  ...(open && {
    marginLeft: theme.config.sidebarWidth,
    width: `calc(100% - ${theme.config.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default Header
