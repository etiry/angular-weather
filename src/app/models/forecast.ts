import { Location } from "./location"

export interface Forecast {
  location: Location,
  days: Day[]
}

export interface Day {
  dayOfWeek: string,
  temp: {
    min: number,
    max: number
  },
  description: string,
  icon: string
}