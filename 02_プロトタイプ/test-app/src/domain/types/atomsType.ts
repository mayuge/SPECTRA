//Atomsで使用している型をここで定義します。
import type {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_WARNING,
  BUTTON_DANGER,
  BUTTON_SUCCESS,
  BUTTON_DARK,
  BUTTON_LIGHT,
  BADGE_PRIMARY,
  BADGE_SECONDARY,
  BADGE_WARNING,
  BADGE_DANGER,
  BADGE_SUCCESS,
} from "@/domain/params/atoms"
export type ButtonVariantType =
  | typeof BUTTON_PRIMARY
  | typeof BUTTON_SECONDARY
  | typeof BUTTON_WARNING
  | typeof BUTTON_DANGER
  | typeof BUTTON_SUCCESS
  | typeof BUTTON_DARK
  | typeof BUTTON_LIGHT

export type BadgeVariantType =
  | typeof BADGE_PRIMARY
  | typeof BADGE_SECONDARY
  | typeof BADGE_WARNING
  | typeof BADGE_DANGER
  | typeof BADGE_SUCCESS
