import { ComponentType, ReactNode } from 'react'
import { StyleProp, ViewStyle, TextStyle } from 'react-native'

export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

export type SweetAlertInput =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'

export type SweetAlertPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'center'
  | 'bottom'

export interface SweetAlertResult {
  isConfirmed: boolean
  isDenied: boolean
  isDismissed: boolean
  value?: any
  dismiss?: DismissReasonType
}

export type DismissReasonType = 'cancel' | 'backdrop' | 'close' | 'esc' | 'timer'

export interface DismissReasonRecord {
  cancel: 'cancel'
  backdrop: 'backdrop'
  close: 'close'
  esc: 'esc'
  timer: 'timer'
}

export interface SweetAlertOptions {
  title?: string
  text?: string
  html?: string
  icon?: SweetAlertIcon
  iconColor?: string
  toast?: boolean
  showConfirmButton?: boolean
  showDenyButton?: boolean
  showCancelButton?: boolean
  confirmButtonText?: string
  confirmButtonColor?: string
  denyButtonText?: string
  denyButtonColor?: string
  cancelButtonText?: string
  cancelButtonColor?: string
  reverseButtons?: boolean
  showCloseButton?: boolean
  allowOutsideClick?: boolean
  allowBackHandler?: boolean
  timer?: number
  timerProgressBar?: boolean
  input?: SweetAlertInput
  inputPlaceholder?: string
  inputLabel?: string
  inputValue?: string | number | boolean
  inputOptions?: Record<string, string>
  inputAutoFocus?: boolean
  inputValidator?: (value: string) => string | null | undefined | Promise<string | null | undefined>
  validationMessage?: string
  returnInputValueOnDeny?: boolean
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
  footer?: string
  width?: number
  padding?: number
  background?: string
  color?: string
  position?: SweetAlertPosition
  progressSteps?: string[]
  currentProgressStep?: number
  preConfirm?: (value?: string) => any | Promise<any>
  preDeny?: (value?: string) => any | Promise<any>
  willOpen?: () => void
  didOpen?: () => void
  willClose?: () => void
  didClose?: () => void
  showLoaderOnConfirm?: boolean
  showLoaderOnDeny?: boolean
  customContainerStyle?: StyleProp<ViewStyle>
  customPopupStyle?: StyleProp<ViewStyle>
  customTitleStyle?: StyleProp<TextStyle>
  customTextStyle?: StyleProp<TextStyle>
  customConfirmButtonStyle?: StyleProp<ViewStyle>
  customDenyButtonStyle?: StyleProp<ViewStyle>
  customCancelButtonStyle?: StyleProp<ViewStyle>
}

export interface SwalInstance {
  fire(options: SweetAlertOptions): Promise<SweetAlertResult>
  fire(title: string, text?: string, icon?: SweetAlertIcon): Promise<SweetAlertResult>
  close(): void
  isVisible(): Promise<boolean>
  mixin(options: SweetAlertOptions): SwalInstance
  DismissReason: DismissReasonRecord
}

export interface SweetAlert2ProviderProps {
  children: ReactNode
}

declare const Swal: SwalInstance
export { Swal }
export default Swal

export declare const SweetAlert2Provider: ComponentType<SweetAlert2ProviderProps>
export declare const DismissReason: DismissReasonRecord
