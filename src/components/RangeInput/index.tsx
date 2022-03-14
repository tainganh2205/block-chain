import React, { useCallback, useEffect, useState } from 'react'
import cx from 'classnames'
import { useRanger } from 'react-ranger'
import { clamp } from 'lodash'

interface StarsProps {
  max: number
  min: number
  step?: number
  value: number[]
  className?: string
  onChange: (value: number[]) => void
  showHandlerValue?: boolean
}

export const RangeInput = React.forwardRef<HTMLDivElement, StarsProps>(
  (props, ref) => {
    const {
      className,
      step = 1,
      min,
      max,
      value,
      onChange: setValues,
      showHandlerValue = true,
    } = props
    const [grabbing, setGrabbing] = useState(false)

    const { getTrackProps, handles, segments } = useRanger({
      min,
      max,
      stepSize: step,
      values: value,
      onChange: setValues,
    })

    const [{ value: l }, { value: r }] = handles

    const leftRange = l > r ? r : l
    const rightRange = l < r ? r : l

    const range = max - min
    const mostLeft = ((leftRange - min) * 100) / range
    const mostRight = 100 - ((rightRange - min) * 100) / range

    const trackRef = React.useRef<HTMLDivElement>(null)

    const handleGrab = useCallback(() => {
      document.body.style.cursor = ''
      setGrabbing(false)
      document.removeEventListener('mouseup', handleGrab)
    }, [])

    const handleMouseDown = useCallback(() => {
      setGrabbing(true)
      document.body.style.cursor = 'grabbing'
      document.addEventListener('mouseup', handleGrab)
    }, [handleGrab])

    const handleSegmentClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (trackRef?.current === null) {
        return
      }
      const clientRect = trackRef.current.getBoundingClientRect()
      const percent = clamp(
        (100 / clientRect.width) * (event.clientX - clientRect.left),
        0,
        100,
      )
      const inputValue = Math.ceil(range * (percent / 100) + min)
      let nextLeft: number = l
      let nextRight: number = r
      const rangeleft = inputValue - l
      const rangeRight = r - inputValue
      if (rangeleft <= rangeRight) {
        nextLeft = inputValue
      }
      if (rangeleft > rangeRight) {
        nextRight = inputValue
      }
      setValues([nextLeft, nextRight])
    }

    useEffect(() => {
      return () => {
        document.removeEventListener('mouseup', handleGrab)
      }
    }, [handleGrab])

    return (
      <div
        className={cx('relative', { 'pb-8': showHandlerValue }, className)}
        ref={ref}
      >
        <div
          className="rounded-full bg-gray-700 h-1 cursor-pointer"
          {...getTrackProps({ ref: trackRef })}
          onClick={handleSegmentClick}
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 bg-primary"
            style={{ left: `${mostLeft}%`, right: `${mostRight}%` }}
          />
          {segments.map(({ getSegmentProps }, i: number) => (
            <div
              {...getSegmentProps({
                index: i,
                onClick: (e: React.MouseEvent<HTMLDivElement>) =>
                  handleSegmentClick(e),
              })}
            />
          ))}
          {handles.map(({ getHandleProps, value: handleValue }) => (
            <button
              className="w-3.5 h-3.5 outline-none rounded-full bg-primary relative"
              {...getHandleProps({
                style: { cursor: grabbing ? 'grabbing' : 'grab' },
                onMouseDown: handleMouseDown,
              })}
            >
              {showHandlerValue && (
                <span className="text-gray-100 font-semibold text-sm absolute center-x top-5">
                  {handleValue}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  },
)
