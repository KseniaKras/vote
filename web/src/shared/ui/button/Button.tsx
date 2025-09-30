import { FC } from 'react'
import { Button as ThemeButton } from '@radix-ui/themes'

interface IButtonProps {
  isLoading: boolean
}

export const Button: FC<IButtonProps> = ({
  isLoading,
}) => {
  return (
    <ThemeButton 
      size="3" 
      variant="soft"
      loading={isLoading}
    >
      Проголосовать
    </ThemeButton>
  )
}
