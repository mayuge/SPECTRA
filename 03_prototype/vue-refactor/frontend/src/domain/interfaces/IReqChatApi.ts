export interface IReqChatApi {
  sendChatMessage: (message: string) => Promise<any>
}
