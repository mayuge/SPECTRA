//Atomsで使用している型をここで定義します。
import type {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_WARNING,
  BUTTON_DANGER,
  BUTTON_SUCCESS,
  BUTTON_DARK,
  BUTTON_LIGHT,
  BUTTON_TEXT_BLACK,
  BUTTON_TEXT_GRAY,
  BUTTON_TEXT_WHITE,
  PULLTAB_PRIMARY,
  PULLTAB_SECONDARY,
  PULLTAB_WARNING,
  PULLTAB_DANGER,
  PULLTAB_SUCCESS,
  PULLTAB_DARK,
  PULLTAB_LIGHT,
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
  POSITION_TOP,
  POSITION_BOTTOM,
  POSITION_RIGHT,
  POSITION_LEFT,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WARNING_COLOR,
  DANGER_COLOR,
  SUCCESS_COLOR,
  DARK_COLOR,
} from "@/domain/params/components"

export type ButtonVariantType =
  | typeof BUTTON_PRIMARY
  | typeof BUTTON_SECONDARY
  | typeof BUTTON_WARNING
  | typeof BUTTON_DANGER
  | typeof BUTTON_SUCCESS
  | typeof BUTTON_DARK
  | typeof BUTTON_LIGHT
  | typeof BUTTON_TEXT_BLACK
  | typeof BUTTON_TEXT_GRAY
  | typeof BUTTON_TEXT_WHITE

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

export type PullTabPositionType =
  | typeof POSITION_TOP
  | typeof POSITION_BOTTOM
  | typeof POSITION_RIGHT
  | typeof POSITION_LEFT

export type PullTabVariantType =
  | typeof PULLTAB_PRIMARY
  | typeof PULLTAB_SECONDARY
  | typeof PULLTAB_WARNING
  | typeof PULLTAB_DANGER
  | typeof PULLTAB_SUCCESS
  | typeof PULLTAB_DARK
  | typeof PULLTAB_LIGHT

export type PullTabSizeType =
  | typeof MINI_SIZE
  | typeof SMALL_SIZE
  | typeof NORMAL_SIZE
  | typeof LARGE_SIZE

export type SwitchColor =
  | typeof PRIMARY_COLOR
  | typeof WARNING_COLOR
  | typeof DANGER_COLOR
  | typeof SUCCESS_COLOR
