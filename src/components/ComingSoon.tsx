import { Alert, AlertIcon, AlertTitle } from 'components/Alert'
import { AlertBody } from 'components/Alert/AlertBody'
import { AlertContent } from 'components/Alert/AlertContent'
import cx from 'classnames'

interface Props {
  className?: string
}

export const ComingSoon = (props: Props) => {
  const { className } = props

  return (
    <div className={cx('container mx-auto px-5 sm:py-10 py-6', className)}>
      <Alert status="info" className="!bg-black">
        <AlertIcon />
        <AlertBody>
          <AlertTitle>Coming soon</AlertTitle>
          <AlertContent>
            We are currently working on the launch. Stay tuned!
          </AlertContent>
        </AlertBody>
      </Alert>
    </div>
  )
}
