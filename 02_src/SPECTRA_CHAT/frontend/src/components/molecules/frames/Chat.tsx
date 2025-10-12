import React from "react"
import Button from "@/components/atoms/buttons/Button"
import TextLabel from "@/components/atoms/labels/TextLabel"
import useDisplayLayerStore from "@/infrastructure/stores/useDisplayLayerStore"

type Chat = {
  message: string
  type: "request" | "response" | "error"
}

type ChatListProps = {
  chatList: Chat[]
}

const ChatList: React.FC<ChatListProps> = ({ chatList }) => {
  const { toggleDisplayLayer, getDisplayLayer } = useDisplayLayerStore()
  let responseCount = 0 // response のみカウント

  return (
    <div className="flex-1 overflow-y-auto pt-4 md:pt-20 px-4 space-y-3">
      {chatList.map((chat, index) => {
        const isUser = chat.type === "request"
        const isError = chat.type === "error"
        const isResponse = chat.type === "response"

        // response のみカウントして layerId に使用
        const layerId = isResponse ? `geojson-layer-${responseCount}` : undefined

        if (isResponse) responseCount += 1

        return (
          <div key={index}>
            <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex justify-center p-4 text-xs shadow
                ${
                  isError
                    ? "bg-danger/90 text-white rounded-lg w-[60%]"
                    : isUser
                    ? "bg-secondary text-black rounded-lg w-[60%]"
                    : "bg-gray-200 text-gray-900 rounded-t-lg w-[80%]"
                }`}
              >
                {chat.message}
              </div>
            </div>

            {/* response のときだけ「表示切替」ボタン */}
            {isResponse && layerId && (
              <div
                className="flex items-center w-[80%] bg-gray-20 gap-1 px-2 rounded-b-lg"
                onClick={() => toggleDisplayLayer(layerId)}
              >
                <Button
                  variant="btn-text-white"
                  iconLeft={getDisplayLayer(layerId) ? "visibility" : "visibility_off"}
                  size="mini"
                />
                <TextLabel text="表示切替" size="small" isBlack={false} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChatList
