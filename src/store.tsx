import create from 'zustand'
import { persist } from 'zustand/middleware'
import createTimeslots from './helpers/createTimeslots'
import { Day, Layout, Period, PeriodType, Timeslot } from './types'

interface LayoutState extends Layout {
  setDays: (days: Day[]) => void
  setTimeslots: (timeslots: Timeslot[]) => void
  updateTimeslot: (timeslot: Timeslot) => void
  setTimeslotsCount: (timeslotsCount: number) => void
  setLabel: (label: string) => void
  setPeriods: (periods: Period[]) => void
  addPeriod: (period: Period) => void
  removePeriod: (id: string | number) => void
}

export const useLayout = create<LayoutState>(
  persist(
    (set) => ({
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
          id: '1',
          type: 'Math',
          day: 1,
          timeslot: 1,
          size: 2,
        },
        {
          id: '2',
          type: 'Recess',
          day: 3,
          timeslot: 2,
          size: 1,
        },
      ],
      setDays: (days) => set({ days }),
      setLabel: (label) => set({ label }),
      setTimeslots: (timeslots) => set({ timeslots }),
      updateTimeslot: (timeslot) =>
        set((state) => {
          const timeslots = [...state.timeslots]
          const i = timeslots.findIndex((ts) => ts.id === timeslot.id)
          timeslots.splice(i, 1, timeslot)
          return { timeslots }
        }),
      setTimeslotsCount: (timeslotsCount) =>
        set({ timeslots: createTimeslots(timeslotsCount) }),
      setPeriods: (periods) => set({ periods }),
      addPeriod: (period) =>
        set((state) => ({ periods: [...state.periods, period] })),
      removePeriod: (idToRemove) =>
        set((state) => ({
          periods: state.periods.filter(({ id }) => id !== idToRemove),
        })),
    }),
    {
      name: 'layout',
    }
  )
)

interface PeriodTypesState {
  types: PeriodType[]
  setTypes: (types: PeriodType[]) => void
  addType: (type: PeriodType) => void
  removeType: (label: string) => void
}

export const usePeriodTypes = create<PeriodTypesState>(
  persist(
    (set) => ({
      types: [
        { colour: 'green.200', label: 'Recess' },
        { colour: 'blue.200', label: 'Math' },
      ],
      setTypes: (types) => set({ types }),
      addType: (type) => set((state) => ({ types: [...state.types, type] })),
      removeType: (labelToRemove) =>
        set((state) => ({
          types: state.types.filter(({ label }) => label !== labelToRemove),
        })),
    }),
    {
      name: 'period-types',
    }
  )
)
