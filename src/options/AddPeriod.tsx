import { Button, Select, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLayout, usePeriodTypes } from '../store'

export default function AddPeriod() {
  const toast = useToast()
  const [selectedType, setSelectedType] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')

  const types = usePeriodTypes((s) => s.types)
  const days = useLayout((s) => s.days)
  const timeslots = useLayout((s) => s.timeslots)
  const addPeriod = useLayout((s) => s.addPeriod)

  function handleAdd() {
    if (!selectedType || !selectedDay || !selectedSlot) {
      toast({
        title: 'Not all options have been selected',
        status: 'error',
      })
    } else {
      addPeriod({
        id: Math.random().toString(),
        type: selectedType,
        timeslot: timeslots.findIndex(({ id }) => id === selectedSlot) + 1,
        day: days.findIndex(({ label }) => label === selectedDay) + 1,
        size: 1,
      })
    }
  }

  return (
    <>
      <Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        width="auto"
        placeholder={
          types.length === 0 ? 'No Period Types' : 'Select Period Type'
        }
        isDisabled={types.length === 0}
      >
        {types.map((type) => {
          return (
            <option key={type.label} value={type.label}>
              {type.label}
            </option>
          )
        })}
      </Select>
      <Select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        width="auto"
        placeholder={days.length === 0 ? 'No Days' : 'Select Day'}
        isDisabled={days.length === 0}
      >
        {days.map((day) => {
          return (
            <option key={day.label} value={day.label}>
              {day.label}
            </option>
          )
        })}
      </Select>
      <Select
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
        width="auto"
        placeholder={
          timeslots.length === 0 ? 'No Timeslots' : 'Select Timeslot'
        }
        isDisabled={timeslots.length === 0}
      >
        {timeslots.map((timeslot) => {
          return (
            <option key={timeslot.id} value={timeslot.id}>
              {timeslot.label}
            </option>
          )
        })}
      </Select>
      <Button colorScheme="blue" onClick={handleAdd}>
        Add Period
      </Button>
    </>
  )
}
