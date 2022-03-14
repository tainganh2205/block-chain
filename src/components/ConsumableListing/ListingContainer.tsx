import { ReactNode } from 'react'

interface ListingContainerProps {
  filter?: ReactNode
  children?: ReactNode
}

export const ListingContainer = ({
  filter,
  children,
}: ListingContainerProps) => {
  return (
    <div className="flex items-start mb-10">
      {children}
      {filter}
    </div>
  )
}
