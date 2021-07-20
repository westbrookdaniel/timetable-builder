import { Timeslot } from '../types'

export default function createTimeslots(timeslotsCount: number): Timeslot[] {
  return new Array(timeslotsCount).fill(null).map((_, i) => {
    return { label: `${8 + i}:00 - ${9 + i}:00` }
  })
}
