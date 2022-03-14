import { storiesOf } from '@storybook/react'
import { Button } from 'components/Button'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'

storiesOf('components/form/FormInput', module).add('basic', () => {
  const formInstance = useForm({
    defaultValues: { email: '', password: '' },
  })
  const { handleSubmit, getValues } = formInstance

  const onSubmit = (data: any) => alert(data)

  return (
    <FormProvider {...formInstance}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5 max-w-xs mb-10">
          <FormInput
            label="Email"
            placeholder="Email"
            name="email"
            fullWidth
            rules={{ required: 'Required' }}
          />
          <FormInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            fullWidth
            rules={{ required: 'Required' }}
          />
          <Button type="submit">Create an account</Button>
        </div>
        <pre className="text-gray-300 p-5 rounded-lg bg-gray-700">
          {JSON.stringify(getValues())}
        </pre>
      </form>
    </FormProvider>
  )
})
