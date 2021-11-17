export interface Bottle {
  id?: number
  name: string
  cellar: string
  vintage: number
  country: string
  region?: string
  apellation?: string
  type: string
  qty?: number
  last_added?: Date
  mycellar?: boolean
  reviewed?: boolean
  date_scraped?: Date
  alcohol_content?: string
  climate_soil?: string
  consumption?: string
  aging?: string
  stay_barrel?: string
  grapes?: [string]
  description?: string
  image?: string
}
