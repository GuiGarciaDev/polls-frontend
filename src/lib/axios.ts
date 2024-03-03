import axios from "axios"

export const api = axios.create({
    withCredentials: true
 })

 export const POLLS_BASE_URL =
 process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
   ? `${process.env.NEXT_PUBLIC_API_URL}`
   : "http://localhost:3333"

   export const WEBSOCKET_BASE_URL =
   process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
     ? `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`
     : "ws://localhost:3333"
