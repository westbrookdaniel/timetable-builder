import create from 'zustand'
import { Day, Layout, Period, PeriodType, Timeslot } from './types'

interface State extends Layout {
  setDays: (days: Day[]) => void
  setTimeslotsCount: (timeslotsCount: number) => void
  setLabel: (label: string) => void
  setPeriods: (periods: Period[]) => void
}

export const useLayout = create<State>((set) => ({
  label: 'My Timetable',
  days: [
    {
      label: 'Monday',
    },
    {
      label: 'Tuesday',
    },
    {
      label: 'Wednesday',
    },
    {
      label: 'Thursday',
    },
    {
      label: 'Friday',
    },
  ],
  timeslots: createTimeslots(11),
  periods: [
    {
      type: 'break',
      day: 1,
      timeslot: 1,
    },
    {
      type: 'break',
      day: 3,
      timeslot: 2,
    },
  ],
  setDays: (days) => set({ days }),
  setLabel: (label) => set({ label }),
  setTimeslotsCount: (timeslotsCount) =>
    set({ timeslots: createTimeslots(timeslotsCount) }),
  setPeriods: (periods) => set({ periods }),
}))

function createTimeslots(timeslotsCount: number): Timeslot[] {
  return new Array(timeslotsCount).fill(null).map((_, i) => {
    return { from: `${8 + i}:00`, until: `${9 + i}:00` }
  })
}
