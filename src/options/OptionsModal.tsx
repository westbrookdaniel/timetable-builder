import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Text,
  Box,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Divider,
  Wrap,
  HStack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLayout, usePeriodTypes } from '../store'
import Field from './Field'
import PeriodType from './PeriodType'

export default function OptionsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addType, removeType, types } = usePeriodTypes()
  const setTimeslotsCount = useLayout((s) => s.setTimeslotsCount)
  const toast = useToast()

  const [timeSlotCount, setTimeSlotCount] = useState<number>(11)
  const [label, setLabel] = useState<string>('')
  const [colour, setColour] = useState<string>('')

  function handleSetTimeSlots() {
    setTimeSlotCount(timeSlotCount)
    toast({
      title: 'Successfully updated',
      status: 'success',
    })
  }

  function handleAddPeriodType() {
    if (types.find(({ label: l }) => l === label) === undefined) {
      addType({ label, colour })
      toast({
        title: 'Successfully added',
        status: 'success',
      })
    } else {
      toast({
        title: 'A Period Type with this label already exists',
        status: 'error',
      })
    }
  }

  function handleDeletePeriodType(label: string) {
    removeType(label)
    toast({
      title: 'Successfully deleted',
      status: 'success',
    })
  }

  return (
    <>
      <Button onClick={onOpen}>Options</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Timetable Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider mb={6} />
            <Box mb={1}>
              <Text as="label">Number of Time Slots</Text>
            </Box>
            <HStack alignItems="center">
              <NumberInput
                onChange={(_, valueAsNumber) => setTimeSlotCount(valueAsNumber)}
                value={timeSlotCount}
                min={1}
                max={20}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={handleSetTimeSlots}>Set</Button>
            </HStack>
            <Divider my={6} />
            <Box pb={2}>
              <Heading mb={3} size="sm">
                Add New Period Type
              </Heading>
              <VStack alignItems="flex-start">
                <Field
                  label="Label"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Eg Recess"
                  identifier="period-label"
                />
                <Field
                  label="Colour"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  placeholder="#3ff80"
                  identifier="period-label"
                />
              </VStack>
              <Button onClick={handleAddPeriodType} mt={4} size="sm">
                Add
              </Button>
            </Box>
            <Divider my={6} />
            <Box>
              <Heading mb={3} size="sm">
                All Period Types
              </Heading>
              <Wrap>
                <PeriodType
                  onDelete={handleDeletePeriodType}
                  label="Recess"
                  colour="#c3f399"
                />
              </Wrap>
            </Box>

            <Divider mt={6} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}