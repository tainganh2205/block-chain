import React from 'react'
import { Text } from 'components/Text'

export interface HeroSkillProps {
  icon: string
  name: string
  description: string
}

export const HeroSkill = ({ icon, name, description }: HeroSkillProps) => {
  return (
    <div className="flex items-start space-x-4">
      <img src={icon} alt={name} width={68} height={68} />
      <div>
        <div className="flex">
          <Text className="text-lg font-semibold" color="white">
            {name}
          </Text>
        </div>
        <div
          className="overflow-ellipsis font-medium leading-snug tracking-[0.3px] text-gray-300"
          dangerouslySetInnerHTML={{
            __html: description.replace(/\\n/g, ' '),
          }}
        />
      </div>
    </div>
  )
}
