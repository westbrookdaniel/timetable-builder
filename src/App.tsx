import { Box, Heading, HStack, Icon } from '@chakra-ui/react'
import { LightningBoltIcon } from '@heroicons/react/outline'
import React from 'react'
import TimetableLayout from './Layout/TimetableLayout'

function App() {
  return (
    <Box fontSize="sm" className="app" p={4}>
      <HStack mt={4} mb={4} className="hideOnPrint">
        <Icon as={LightningBoltIcon} height="20px" width="20px" />
        <Heading size="md">Timetable Builder</Heading>
      </HStack>
      <TimetableLayout />
    </Box>
  )
}

export default App
