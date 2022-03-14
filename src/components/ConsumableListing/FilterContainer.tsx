import { ReactNode } from 'react'

interface FilterContainerProps {
  children?: ReactNode
}

export const FilterContainer = ({ children }: FilterContainerProps) => {
  return (
    <div className="w-[320px] min-h-[400px] lg:block hidden flex-none bg-black p-8 rounded-lg">
      {children}
    </div>
  )
}
