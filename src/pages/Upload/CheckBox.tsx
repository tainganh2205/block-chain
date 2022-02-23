/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */

import React, { forwardRef, memo, useCallback, useRef } from 'react'
import debounce from 'lodash.debounce'

const CheckBox = memo(forwardRef<any, any>((props: any, ref: any) => {
  const refInput = useRef<any>(null)
  
  const onClick = useCallback((e) => {
    e.preventDefault()
    refInput.current?.click()
  }, [refInput])

  const onChange = useCallback((e) => {
    return props.onChange && props.onChange(e)
  }, [props])

  return (
    <label
      onClick={debounce(onClick, 100, { leading: true, trailing: false })}
      className={`${props.className} c-checkbox-bscs-wrapper`}
      htmlFor={props.htmlFor}
    >
      {props.label}
      <input
        ref={refInput}
        onChange={debounce(onChange, 100, { leading: true, trailing: false })}
        className="c-checkbox-bscs-hiden"
        type="checkbox"
        name={props.name}
      />
      <span
        className='c-checkbox-bscs'
      />
    </label>
  )
}))

export default CheckBox