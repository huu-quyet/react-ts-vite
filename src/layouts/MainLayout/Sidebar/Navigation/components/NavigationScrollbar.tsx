import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { FCC } from '@src/types/app/react'
import SimpleBar from 'simplebar-react'

import 'simplebar-react/dist/simplebar.min.css'

const NavigationScrollbar: FCC = (props) => {
  const { children } = props
  return (
    <Box
      sx={{
        height: 1,
        maxHeight: 1,
        flexGrow: 1,
        overflow: 'hidden'
      }}
    >
      <Scrollbar>{children}</Scrollbar>
    </Box>
  )
}

const Scrollbar = styled(SimpleBar)({
  height: '100%',
  '& .simplebar-content': {
    height: '100%'
  }
})

export default NavigationScrollbar
