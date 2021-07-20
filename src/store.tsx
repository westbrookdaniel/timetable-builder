import create from 'zustand'
import createTimeslots from './helpers/createTimeslots'
import { Day, Layout, Period, Timeslot } from './types'

interface State extends Layout {
  setDays: (days: Day[]) => void
  setTimeslots: (timeslots: Timeslot[]) => void
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
  setTimeslots: (timeslots) => set({ timeslots }),
  setTimeslotsCount: (timeslotsCount) =>
    set({ timeslots: createTimeslots(timeslotsCount) }),
  setPeriods: (periods) => set({ periods }),
}))
