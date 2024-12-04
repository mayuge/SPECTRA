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
  BADGE_DARK,
} from "@/domain/params/atoms"

import type {
  MINI_SIZE,
  SMALL_SIZE,
  NORMAL_SIZE,
  LARGE_SIZE,
  XLARGE_SIZE,
} from "@/domain/params/components"

export type ButtonVariantType =
  | typeof BUTTON_PRIMARY
  | typeof BUTTON_SECONDARY
  | typeof BUTTON_WARNING
  | typeof BUTTON_DANGER
  | typeof BUTTON_SUCCESS
  | typeof BUTTON_DARK
  | typeof BUTTON_LIGHT

export type ButtonSizeType =
  | typeof MINI_SIZE
  | typeof SMALL_SIZE
  | typeof NORMAL_SIZE
  | typeof LARGE_SIZE

export type BadgeVariantType =
  | typeof BADGE_PRIMARY
  | typeof BADGE_SECONDARY
  | typeof BADGE_WARNING
  | typeof BADGE_DANGER
  | typeof BADGE_SUCCESS
  | typeof BADGE_DARK

  export type TextLabelSizeType =
  | typeof MINI_SIZE
  | typeof SMALL_SIZE
  | typeof NORMAL_SIZE
  | typeof LARGE_SIZE
  | typeof XLARGE_SIZE



