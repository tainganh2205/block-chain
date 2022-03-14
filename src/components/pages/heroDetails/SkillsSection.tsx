import React from 'react'
import { Heading } from 'components/Heading'
import { HeroSkill } from 'components/HeroSkill'
import { Card } from 'components/Card'

export interface HeroSkillData {
  id: string
  name: string
  description: string
  skillAvatar: string
}
export interface SkillSectionProps {
  skills: HeroSkillData[]
}

export const SkillsSection = ({ skills }: SkillSectionProps) => {
  return (
    <div className="space-y-2">
      <Heading as="h3">Skills</Heading>
      <Card className="sm:px-8 lg:px-10 py-8 space-y-6">
        {skills.map((skill) => (
          <HeroSkill
            key={skill.id}
            icon={skill.skillAvatar}
            description={skill.description}
            name={skill.name}
          />
        ))}
      </Card>
    </div>
  )
}
