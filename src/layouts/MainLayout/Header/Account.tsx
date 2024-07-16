import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Fragment, useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import useAuthState from '@src/hooks/useAuthState'
import useDialog from '@src/hooks/useDialog'
import Logger from '@src/utils/Logger'
import sleep from '@src/utils/sleep'

const Account = () => {
  const { logout } = useAuthState()
  const anchor = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const dialog = useDialog()

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleLogout = async () => {
    handleClose()
    await sleep(350)

    dialog({
      headline: 'Đăng xuất',
      supportingText: 'Bạn có chắc chắn muốn đăng xuất?',
      icon: <LogoutIcon fontSize='large' />,
      onConfirm: async () => {
        try {
          await logout()
        } catch (error) {
          Logger.log(error)
          // Unable to logout.
        }
      }
    })
  }

  return (
    <Fragment>
      <ButtonBase onClick={handleOpen} ref={anchor}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ height: 40, width: 40 }}>
            <AccountCircleIcon fontSize='small' />
          </Avatar>
          <Typography variant='subtitle2' color='text.primary'>
            Supper Admin
          </Typography>
        </Stack>
      </ButtonBase>
      <Popover
        anchorEl={anchor.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 300, mt: 1 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar sx={{ height: 40, width: 40 }}>
            <AccountCircleIcon />
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant='body2'>Supper Admin</Typography>
            <Typography color='text.scondary' variant='caption'>
              supperAdmin@gmail.com
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ my: 1 }}>
          <MenuItem component={RouterLink} to='/account' onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary='Tài khoản' />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Đăng xuất' />
          </MenuItem>
        </Box>
      </Popover>
    </Fragment>
  )
}

export default Account
