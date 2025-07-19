import axios from "axios"

// ベースURLを指定してインスタンスを作成
export const getInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, // ベースURLを設定
  })
}
