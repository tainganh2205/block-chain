import React from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'constant/routes'
import { useAuthContext } from 'context/auth'
import cx from 'classnames'
import { Button } from './Button'
import { RequireSignatureHOC } from './RequireSignatureHOC'

export const PlaygameButton = ({
  hasBorder = false,
  className,
  ...rest
}: {
  hasBorder?: boolean
  'data-testid'?: string
  className?: string
}) => {
  const { push } = useRouter()
  const {
    token: { signature, challenge },
    walletId,
  } = useAuthContext()

  return (
    <RequireSignatureHOC>
      <Button
        {...rest}
        disabled={!walletId || !signature || !challenge}
        className={cx('px-3', className)}
        appearance={hasBorder ? 'border-white' : 'borderless'}
        onClick={() => push(ROUTES.PLAY_GAME.slug)}
      >
        Play game
      </Button>
    </RequireSignatureHOC>
  )
}
