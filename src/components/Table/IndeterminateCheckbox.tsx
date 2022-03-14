import { forwardRef, useEffect, useRef } from 'react'
import { useMergeRefs } from '@dwarvesf/react-hooks'
import { Checkbox } from 'components/Checkbox'

interface IndeterminateCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean
  name: string
}

export const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef()
  const combinedRef = useMergeRefs(ref, defaultRef) as any

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false
    }
  }, [combinedRef, indeterminate])

  return <Checkbox ref={combinedRef} {...rest} />
})
