import { Alert, AlertIcon } from 'components/Alert'
import { AlertBody } from 'components/Alert/AlertBody'
import { AlertContent } from 'components/Alert/AlertContent'

export function FinishedPoolsNotice() {
  return (
    <div className="flex justify-center mb-6">
      <Alert className="items-center" status="warning">
        <AlertIcon />
        <AlertBody>
          <AlertContent>
            These pools are no longer distributing rewards.
            <br />
            Please withdraw your tokens and past rewards.
          </AlertContent>
        </AlertBody>
      </Alert>
    </div>
  )
}
