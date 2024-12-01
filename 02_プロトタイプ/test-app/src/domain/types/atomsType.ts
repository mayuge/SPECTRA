//Atomsで使用している型をここで定義します。
import type {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_WARNING,
  BUTTON_DANGER,
  BUTTON_SUCCESS,
} from "@/domain/params/atoms"
export type ButtonVariantType =
  | typeof BUTTON_PRIMARY
  | typeof BUTTON_SECONDARY
  | typeof BUTTON_WARNING
  | typeof BUTTON_DANGER
  | typeof BUTTON_SUCCESS
