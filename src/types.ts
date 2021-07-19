type Time = string

export interface Timeslot {
  from: Time
  until: Time
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
  type: string
  timeslot: number
  day: number
}

export interface PeriodType {
  colour: string
  label: string
}
