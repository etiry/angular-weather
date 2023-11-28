import { Location } from "./location"

export interface Forecast {
  location: Location,
  days: Day[]
}

export interface Day {
  temp: {
    min: number,
    max: number
  },
  description: string,
  icon: string
}