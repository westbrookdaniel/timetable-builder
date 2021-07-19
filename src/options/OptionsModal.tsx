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
} from '@chakra-ui/react'
import React from 'react'
import Field from './Field'

export default function OptionsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
            <VStack pb={2} alignItems="flex-start">
              <Text as="label">Number of Time Slots</Text>
              <NumberInput defaultValue={11} min={10} max={20}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <Divider my={6} />
            <Box pb={2}>
              <Heading mb={3} size="sm">
                Add New Period Type
              </Heading>
              <VStack alignItems="flex-start">
                <Field
                  label="Label"
                  placeholder="Eg Recess"
                  identifier="period-label"
                />
                <Field
                  label="Colour"
                  placeholder="#3ff80"
                  identifier="period-label"
                />
              </VStack>
              <Button mt={4} size="sm" onClick={onClose}>
                Add
              </Button>
            </Box>
            <Divider my={6} />
            <Box>
              <Heading mb={3} size="sm">
                All Period Types
              </Heading>
              <Wrap>
                <p>Recess</p>
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
