import { useAuthContext } from 'context/auth'
import { cloneElement, Children } from 'react'
import { WithChildren } from 'types/common'

export const RequireSignatureHOC = ({ children }: WithChildren) => {
  const inner = Children.only(children)
  const { checkExpiredSignature, clearSignature } = useAuthContext()
  const isExpired = checkExpiredSignature()

  return cloneElement(inner, {
    ...inner.props,
    onClick: isExpired ? clearSignature : inner.props.onClick,
  })
}
