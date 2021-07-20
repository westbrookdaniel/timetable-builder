import { Timeslot } from '../types'

export default function createTimeslots(timeslotsCount: number): Timeslot[] {
  return new Array(timeslotsCount).fill(null).map((_, i) => {
    return { from: `${8 + i}:00`, until: `${9 + i}:00` }
  })
}
