import React from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { usePopperTooltip, TriggerType } from 'react-popper-tooltip'

export interface TooltipProps {
  label?: React.ReactNode
  children: React.ReactNode
  className?: string
  classNameChildren?: string
  triggerType?: TriggerType
  as?: React.ElementType
}

export function Tooltip({
  children,
  label,
  className,
  classNameChildren,
  triggerType = 'hover',
  as: Type = 'span',
}: TooltipProps) {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
    state,
  } = usePopperTooltip({
    trigger: triggerType,
  })

  return (
    <>
      <Type className={classNameChildren} ref={setTriggerRef}>
        {children}
      </Type>
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              className: cx('max-w-3xl bg-white rounded-xl p-4', className),
            })}
          >
            <div
              {...getArrowProps({
                className: cx('w-4 h-4 pointer-events-none', {
                  'left-0 top-0 mt-[-8px] border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-[16px] border-b-white':
                    state && state.placement === 'bottom',
                  'left-0 bottom-0 mb-[-8px] border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-[16px] border-t-white':
                    state && state.placement === 'top',
                  'left-0 ml-[-8px] border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[16px] border-r-white':
                    state && state.placement === 'right',
                  'right-0 mr-[-8px] border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[16px] border-l-white':
                    state && state.placement === 'left',
                }),
              })}
            />
            {label}
          </div>,
          document.body,
        )}
    </>
  )
}
