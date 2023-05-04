export interface ITicketItem {
  price: number
  carrier: string
  segments: ISegment[]
}

export interface ISegment {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}