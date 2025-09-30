import React, { useImperativeHandle, useState } from "react"

import { INotificationHandler, NotificationType } from "./notificationTypes"
import { Toast } from "radix-ui"

import styles from './Notification.module.css'

const colorByType: Record<NotificationType, 'blue' | 'green' | 'red'> = {
  [NotificationType.Success]: 'green',
  [NotificationType.Info]: 'blue',
  [NotificationType.Error]: 'red',
}

const titleByType = {
  [NotificationType.Success]: 'Успешно',
  [NotificationType.Info]: 'Инфо',
  [NotificationType.Error]: 'Ошибка',
}

export const Notification = React.forwardRef<INotificationHandler>(({}, forwardedRef) => {
  const [opened, setOpened] = useState(false)
  const [type, setType] = useState<NotificationType | null>(null)
  const [text, setText] = useState<string | null>(null)

  useImperativeHandle(forwardedRef, () => ({
		publish: (type: NotificationType, text: string) => {
      setOpened(true)
      setType(type)
      setText(text)
    },
	}))

  return (
    <>
      {type === NotificationType.Error && (
        <>
          <Toast.Root className={styles.ToastRootError}  open={opened} onOpenChange={setOpened} duration={3000}>
          <Toast.Title className={styles.ToastTitle}>{titleByType[type]}</Toast.Title>
            <Toast.Description className={styles.ToastDescription}>{text}</Toast.Description>
            <Toast.Close />
          </Toast.Root>

          <Toast.Viewport className={styles.ToastViewport} />
        </>
      )}

      {type === NotificationType.Success && (
        <>
          <Toast.Root className={styles.ToastRootSuccess} open={opened} onOpenChange={setOpened} duration={3000}>
          <Toast.Title className={styles.ToastTitle}>{titleByType[type]}</Toast.Title>
            <Toast.Description className={styles.ToastDescription}>{text}</Toast.Description>
            <Toast.Close />
          </Toast.Root>

          <Toast.Viewport className={styles.ToastViewport} />
        </>
      )}

      {type === NotificationType.Info && (
        <>
          <Toast.Root className={styles.ToastRootInfo} open={opened} onOpenChange={setOpened} duration={3000}>
          <Toast.Title className={styles.ToastTitle}>{titleByType[type]}</Toast.Title>
            <Toast.Description className={styles.ToastDescription}>{text}</Toast.Description>
            <Toast.Close />
          </Toast.Root>

          <Toast.Viewport className={styles.ToastViewport} />
        </>
      )}

    </>
  )
})