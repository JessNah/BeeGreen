export interface productItem {
    name: string,
    id: string,
    image?: string,
    price?: string
    quantity?: string
    score?: number
    top3Metrics?: {[key:string]: any},
    category?: string,
    details?: string
  }