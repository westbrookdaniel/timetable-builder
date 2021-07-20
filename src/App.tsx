import { Box, Input } from '@chakra-ui/react'
import React from 'react'
import TimetableLayout from './Layout/TimetableLayout'

function App() {
  return (
    <Box p={4}>
      <TimetableLayout />
    </Box>
  )
}

export default App

// Number of Time Slots
// Table types add and remove
// Add Period of type in timeslot and day
// Format and color
