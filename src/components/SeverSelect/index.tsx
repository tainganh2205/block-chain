import { Select, SelectOption } from 'components/Select'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs'
import { useMemo } from 'react'

interface SeverSelectProps {
  className?: string
  value: string
  onChange: (value: string) => void
  hasAll?: boolean
  placeholder?: string
  appearance?: 'default' | 'borderless'
}

export const SeverSelect = (props: SeverSelectProps) => {
  const {
    className,
    value,
    onChange,
    hasAll = false,
    placeholder,
    appearance = 'default',
  } = props

  const { data } = useFetchWithCache(GET_PATHS.servers, () =>
    client.getServer(),
  )

  const options: SelectOption[] = useMemo(() => {
    const opts = (data?.data || []).map(({ name, id }) => ({
      text: name || '',
      value: String(id) || '',
    }))
    if (hasAll) {
      opts.unshift({ text: 'All Server', value: '' })
    }
    return opts
  }, [data, hasAll])

  return (
    <Select
      className={className}
      appearance={appearance}
      placeholder={placeholder ?? 'Select server'}
      value={String(value)}
      onChange={onChange}
      options={options}
      align="right"
    />
  )
}
