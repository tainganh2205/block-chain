/* eslint-disable react/jsx-curly-brace-presence */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { ButtonArt } from 'components/Art'

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/media-has-caption */

const UploadFile = memo(forwardRef<any, any>((props: any, ref: any) => {
  const refInput = useRef<any>(null)
  const refFile = useRef<any>(null)
  const [file, setFile] = useState<any>({
    source: null,
    type: ''
  });

  const onChange = useCallback((e) => {
    // console.log("🚀 ~ file: UploadFile.tsx ~ line 28 ~ onChange ~ e", e)
    e.preventDefault()
    if (e.target.files.length > 0) {
      const source = URL.createObjectURL(e.target.files[0])
      const type = e.target.files[0].type
      setFile({ source, type })
    }
    return props.onChange && props.onChange(e)
  }, [props])

  const onClick = useCallback((e) => {
    e.preventDefault()
    if (!refInput.current) {
      return;
    }
    refInput.current?.click()
  }, [refInput])

  useImperativeHandle(ref, () => {
    return {
      reset: () => setFile({ source: null, type: '' })
    }
  }, [])

  useEffect(() => {
    if (props.src) {
      setFile(p => ({ ...p, source: props.src }))
    }
  }, [props.src])
  // console.log('file.source: ', file.source)
  // console.log('file.type: ', file.type)
  return (
    <>
      <div
        onClick={debounce(onClick, 100, { leading: true, trailing: false })}
        className='c-upload-image'
      >
        {!file.source ? (
          <>
            <img src="/images/logoUpLoad.png" alt="upload icon" />
            <p className='note'>{`Select file`}</p>
            <ButtonArt className='btnA' data-variant='tertiary' mt='65px' mb='27px' height='40px'>Browse File</ButtonArt>
          </>
        ) : (
          file.type.indexOf('video') > -1
          ? (
            <video autoPlay ref={refFile} className='fileSelected'>
              <source src={file.source} type={file.type} />
            </video>
          ) 
          : ( <img ref={refFile} className='fileSelected' src={file.source || ''} alt="File Selected" />)
        )}
      </div>
      <input
        // onDrop={e => console.log('e', e)}
        type="file"
        className="inputFile"  
        ref={refInput}
        accept={props.accept}
        id={props.id}
        name={props.name}
        onChange={debounce(onChange, 100, { leading: true, trailing: false })}
      />
    </>
  )
}))

export default UploadFile