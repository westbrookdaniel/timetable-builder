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
import { HexColorPicker } from 'react-colorful'

export default function OptionsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { addType, removeType, types } = usePeriodTypes()
  const setCount = useLayout((s) => s.setTimeslotsCount)
  const toast = useToast()

  const [timeSlotCount, setTimeSlotCount] = useState<number>(11)
  const [label, setLabel] = useState<string>('')
  const [colour, setColour] = useState<string>('')

  function handleSetTimeSlots() {
    setCount(timeSlotCount)
    toast({
      title: 'Successfully updated',
      status: 'success',
    })
  }

  function handleAddPeriodType() {
    if (label.length === 0 || !colour) {
      return toast({
        title: 'Pick a label and colour',
        status: 'error',
      })
    }
    if (types.find(({ label: l }) => l === label) === undefined) {
      addType({ label, colour })
      toast({
        title: 'Successfully added',
        status: 'success',
      })
      setLabel('')
      setColour('')
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

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
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
              <HStack justifyContent="space-between">
                <Box>
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
                      placeholder="#95f067 or blue.200"
                      identifier="period-label"
                    />
                    <Button onClick={handleAddPeriodType} mt={4} size="sm">
                      Add
                    </Button>
                  </VStack>
                </Box>
                <HexColorPicker color={colour} onChange={setColour} />
              </HStack>
            </Box>
            <Divider my={6} />
            <Box>
              <Heading mb={3} size="sm">
                All Period Types
              </Heading>
              <Wrap>
                {types.length === 0 ? (
                  <Text color="gray.500">No Types Exist</Text>
                ) : null}
                {types.map((type) => (
                  <PeriodType
                    onDelete={handleDeletePeriodType}
                    label={type.label}
                    colour={type.colour}
                    key={type.label}
                  />
                ))}
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
