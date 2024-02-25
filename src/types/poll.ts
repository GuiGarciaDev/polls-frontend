export interface Polls {
    polls: Poll[]
  }
  
  export interface Poll {
    id: string
    title: string
    createdAt: string
    updatedAt: string
    options: Option[]
  }
  
  export interface Option {
    id: string
    title: string
    score: number
  }