import { Box } from '@chakra-ui/react'
import React from 'react'
import TimetableLayout from './Layout/TimetableLayout'

function App() {
  return (
    <Box fontSize="sm" className="app" p={4}>
      <TimetableLayout />
    </Box>
  )
}

export default App
