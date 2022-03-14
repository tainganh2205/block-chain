import { Button } from 'components/Button'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import Link from 'next/link'
import cx from 'classnames'

interface CallToActionProps {
  title: React.ReactNode
  message: React.ReactNode
  buttonText?: string
  onClick?: () => void
  buttonTestId?: string
  href?: string
  newTab?: boolean
  className?: string
}

export const CallToAction = ({
  message,
  title,
  buttonText,
  buttonTestId,
  onClick,
  href,
  newTab = false,
  className,
}: CallToActionProps) => {
  return (
    <div
      className={cx('text-center flex items-center flex-col w-full', className)}
    >
      <div className="space-y-3">
        <Heading as="h2" className="!text-30 sm:!text-40">
          {title}
        </Heading>
        <Text>{message}</Text>
      </div>
      {buttonText && (
        <footer className="mt-6">
          {href ? (
            <Link href={href}>
              <Button
                onClick={onClick}
                data-testid={buttonTestId}
                target={newTab ? '_blank' : undefined}
              >
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button onClick={onClick} data-testid={buttonTestId}>
              {buttonText}
            </Button>
          )}
        </footer>
      )}
    </div>
  )
}
