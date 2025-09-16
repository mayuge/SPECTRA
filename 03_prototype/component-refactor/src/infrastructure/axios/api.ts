import axios from "axios"

// ベースURLを指定してインスタンスを作成
export const getInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_OPEN_DATA_BASE_URL_DEFAULT, // ベースURLを設定
  })
}

// 今年限定のベースURLを指定してインスタンスを作成
export const getInstanceLimited = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_OPEN_DATA_BASE_URL_LIMITED, // ベースURLを設定
  })
}
