/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, memo, useCallback } from 'react'
import debounce from 'lodash.debounce'

import { PropsButtonBSC, RefButtonBSC } from './index.d'
import './index.less'

const ButtonBSC = memo(forwardRef<RefButtonBSC, PropsButtonBSC>((props, ref) => {
  const { ghost, gray, loading, id, className, disabledCustom, disabled } = props
  const hasSpecTheme = useCallback((): string => {
    const classes: string[] = ['btn-bsc-primary']
    if (gray) {
      classes.push('btn-bsc-gray')
    }
    if (ghost) {
      classes.push('btn-bsc-ghost')
    } 
    if (loading) {
      classes.push('btn-bsc-loading')
    }
    if(disabledCustom) {
      classes.push('btn-bsc-disabledCustom')
    }

    if(disabled) {
      classes.push('btn-bsc-disabled')
    }
    
    return classes.join(' ')
  }, [ghost, gray, loading, disabled])

  const handleClick = useCallback((e: any) => {
    return props.click&&props.click(e)
    
  }, [props.click])

  return (
    <div
      {...(id ? { id }:{})}
      className={`
        btn-bsc-common 
        ${hasSpecTheme()} 
        ${className || ''}
      `}
    >
      <button
        onClick={debounce(handleClick, 200, { leading: true, trailing: false })}
        type='button'
        disabled={props.disabled}
      >
        <div>
          {props.loading && (<img className='btn-bsc-icon-loading' src='/images/loading.svg' alt='...loading' />)}
          {props.text&&(<span style={{ visibility: props.loading ? 'hidden' : 'visible' }}>{props.text}</span>)}
          {/* {props.href&&(<a href={props.href}>{props.text}</a>)} */}
        </div>
      </button>
    </div>
  )
}))

export * from './index.d'

export default ButtonBSC