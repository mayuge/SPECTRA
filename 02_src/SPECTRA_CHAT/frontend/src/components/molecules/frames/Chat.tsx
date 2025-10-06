import React from "react"

type Chat = {
  message: string
  type: "request" | "response" | "error"
}

type ChatListProps = {
  chatList: Chat[]
}

const ChatList: React.FC<ChatListProps> = ({ chatList }) => (
  <div className="flex-1 overflow-y-auto pt-20 px-4 space-y-3">
    {chatList.map((chat, index) => {
      const isUser = chat.type === "request"
      const isError = chat.type === "error"
      return (
        <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
          <div
            className={`flex justify-center max-w-[75%] min-w-[40%] p-4 rounded-lg text-xs shadow
              ${
                isError
                  ? "bg-danger/90 text-white"
                  : isUser
                  ? "bg-secondary text-black"
                  : "bg-gray-200 text-gray-900"
              }
            `}
          >
            {chat.message}
          </div>
        </div>
      )
    })}
  </div>
)

export default ChatList
