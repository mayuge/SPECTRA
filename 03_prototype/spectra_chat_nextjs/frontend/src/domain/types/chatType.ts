export type ChatType = {
  type: "request" | "response" | "error"
  message: string
  isdata: boolean
}
