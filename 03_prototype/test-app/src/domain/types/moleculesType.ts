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

import type { MINI_SIZE, SMALL_SIZE, NORMAL_SIZE, LARGE_SIZE } from "@/domain/params/components"

//ヘッダーのバリアントの型
export type HeaderVariantType =
  | typeof HEADER_PRIMARY
  | typeof HEADER_SECONDARY
  | typeof HEADER_WARNING
  | typeof HEADER_DANGER
  | typeof HEADER_SUCCESS
  | typeof HEADER_DARK
  | typeof HEADER_LIGHT

export type HeaderSizeType =
  | typeof MINI_SIZE
  | typeof SMALL_SIZE
  | typeof NORMAL_SIZE
  | typeof LARGE_SIZE
