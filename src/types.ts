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
  period: Period
  timeslot: Timeslot
}

export interface PeriodType {
  colour: string
  label: string
}
