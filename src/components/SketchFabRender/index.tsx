import { useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import { Transition } from '@headlessui/react'
import { IconSpinner } from 'components/icons/components/IconSpinner'

interface SketchFabRenderProps {
  id: string
  className?: string
}

export const SketchFabRender = (props: SketchFabRenderProps) => {
  const { id, className } = props
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const iframe = iframeRef.current
    if (iframe) {
      iframe.onload = () => {
        setTimeout(() => {
          setLoaded(true)
          // avoid some loading text
        }, 2000)
      }
    }
  }, [id])

  return (
    <div className={className}>
      <iframe
        title="hero"
        className={cx(
          'absolute inset-0 w-full h-full transition duration-500',
          {
            'opacity-0': !loaded,
          },
        )}
        // We feed the ref to the iframe component to get the underlying DOM object
        src={`https://sketchfab.com/models/${id}/embed?autostart=1&camera=0&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_hint=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0`}
        ref={iframeRef}
      />
      <Transition
        show={!loaded}
        enter="transition duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <IconSpinner
          className="text-white text-3xl absolute center-xy"
          aria-label="Loading..."
          width="1em"
          height="1em"
        />
      </Transition>
    </div>
  )
}
