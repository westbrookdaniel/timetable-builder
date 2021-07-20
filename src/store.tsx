import create from 'zustand'
import createTimeslots from './helpers/createTimeslots'
import { Day, Layout, Period, PeriodType, Timeslot } from './types'

interface LayoutState extends Layout {
  setDays: (days: Day[]) => void
  setTimeslots: (timeslots: Timeslot[]) => void
  setTimeslotsCount: (timeslotsCount: number) => void
  setLabel: (label: string) => void
  setPeriods: (periods: Period[]) => void
}

export const useLayout = create<LayoutState>((set) => ({
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

interface PeriodTypesState {
  types: PeriodType[]
  setTypes: (types: PeriodType[]) => void
  addType: (type: PeriodType) => void
  removeType: (label: string) => void
}

export const usePeriodTypes = create<PeriodTypesState>((set) => ({
  types: [],
  setTypes: (types) => set({ types }),
  addType: (type) => set((state) => ({ types: [...state.types, type] })),
  removeType: (labelToRemove) =>
    set((state) => ({
      types: state.types.filter(({ label }) => label !== labelToRemove),
    })),
}))
