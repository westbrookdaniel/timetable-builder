export interface Timeslot {
  id: string
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
  id: string
  type: string
  timeslot: number
  day: number
  size: number
}

export interface PeriodType {
  colour: string
  label: string
}
