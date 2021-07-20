export interface Timeslot {
  label: string
}
export interface Day {
  label: string
}

export interface Layout {
  label: string
  days: Day[]
  timeslots: Timeslot[]
  periods: Period[]
}

export interface Period {
  id: number | string
  type: string
  timeslot: number
  day: number
}

export interface PeriodType {
  colour: string
  label: string
}
