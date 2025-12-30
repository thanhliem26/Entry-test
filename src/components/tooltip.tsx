import type { ReactNode } from 'react'
import { useState } from 'react'
import clsx from 'clsx'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content: string | ReactNode
  children: ReactNode
  position?: TooltipPosition
  className?: string
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-dark',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-dark',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-dark',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-dark',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={clsx(
            'absolute z-50 px-2 py-1 bg-background-unselect rounded-base shadow-xs rounded-lg',
            positionClasses[position],
            'animate-in fade-in-0 zoom-in-95 duration-200',
            className
          )}
          role="tooltip"
        >
          <span className="text-text-secondary font-normal whitespace-nowrap text-xs">{content}</span>
          <div className={clsx('absolute w-0 h-0 border-4 border-transparent', arrowClasses[position])} />
        </div>
      )}
    </div>
  )
}
