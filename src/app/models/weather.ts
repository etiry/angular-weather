import { Location } from "./location"

export interface Weather {
  location: Location,
  temp: number,
  description: string,
  icon: string
}