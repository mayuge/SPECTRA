import axios from "axios"

// ベースURLを指定してインスタンスを作成
export const getInstance = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // ベースURLを設定
  })
}
