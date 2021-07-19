import React from 'react'

interface PeriodLayout {
  w: number
  h: number
  x: number
  y: number
}

type Props = React.PropsWithChildren<
  {
    key: string
    grid: PeriodLayout
  } & React.HTMLAttributes<HTMLDivElement>
>

const Period = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={'border grid place-items-center' + ` ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default Period
