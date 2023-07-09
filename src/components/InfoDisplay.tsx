import classNames from 'classnames'

interface InfoDisplayProps {
  children: string | number
  className?: string
}

export function InfoDisplay({ children, className = '' }: InfoDisplayProps) {
  return (
    <div
      className={classNames(
        'bg-black h-20 flex items-center justify-center boldFont rounded-common',
        className
      )}
    >
      {children}
    </div>
  )
}
