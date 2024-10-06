import * as React from 'react'

export type ToastRef = {
  show: (text: string) => void
}

export const toastRef = React.createRef<ToastRef | undefined>()

export const showToast = (text: string) => {
  toastRef.current?.show(text)
}
