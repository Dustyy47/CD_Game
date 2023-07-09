import classNames from 'classnames'
import { ButtonHTMLAttributes } from 'react'

type ButtonStyleType = 'lime' | 'yellow'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: ButtonStyleType
}

export function Button({
  children,
  disabled,
  styleType,
  ...props
}: ButtonProps) {
  const typeStyle = {
    lime: 'bg-lime',
    yellow: 'bg-yellow'
  }[styleType]

  return (
    <button
      {...props}
      className={classNames(
        'rounded-common text-black h-[3.75rem] w-full ',
        typeStyle
      )}
    >
      {children}
    </button>
  )
}
