//Atomsで使用している型をここで定義します。
import type {
  HEADER_PRIMARY,
  HEADER_SECONDARY,
  HEADER_WARNING,
  HEADER_DANGER,
  HEADER_SUCCESS,
  HEADER_DARK,
  HEADER_LIGHT,
} from "@/domain/params/molecules"

//ヘッダーのバリアントの型
export type HeaderVariantType =
  | typeof HEADER_PRIMARY
  | typeof HEADER_SECONDARY
  | typeof HEADER_WARNING
  | typeof HEADER_DANGER
  | typeof HEADER_SUCCESS
  | typeof HEADER_DARK
  | typeof HEADER_LIGHT
