import React from 'react'
import { Heading } from 'components/Heading'
import { Text } from 'components/Text'
import { ModelHeroDetail } from 'types/schema'
import cx from 'classnames'
import { Empty } from 'components/Empty'
import { Card } from 'components/Card'

export interface SkillPropertyProps {
  name: string
  value: number
}

export const SkillProperty = ({ name, value }: SkillPropertyProps) => {
  return (
    <div className="flex justify-between">
      <Text className="font-semibold" color="gray-300">
        {name}
      </Text>
      <Text className="text-2xl font-bold" color="white">
        +{value}
      </Text>
    </div>
  )
}

export type SkillbookColor =
  | 'white'
  | 'green'
  | 'blue'
  | 'purple'
  | 'yellow'
  | 'orange'
  | 'red'

export interface SkillbookProps {
  name: string
  numOfBooks: number
  props: SkillPropertyProps[]
}

export const Skillbook = ({ name, numOfBooks, props }: SkillbookProps) => {
  return (
    <div className="">
      <div className="flex space-x-3">
        <Heading as="h4">
          <div
            dangerouslySetInnerHTML={{
              __html: name.replace(/\\n/g, ' '),
            }}
          />
        </Heading>
        <Text color="gray-300">{numOfBooks} Books</Text>
      </div>
      <div className="mt-6 space-y-6">
        {props.map((prop) => (
          <SkillProperty key={prop.name} name={prop.name} value={prop.value} />
        ))}
      </div>
    </div>
  )
}

export interface SkillbookProperty {
  name: string
  value: number
}
export interface HeroSkillBook {
  id: string
  name: string
  total: number
  properties: SkillbookProperty[]
}
export interface SkillbookSectionProps {
  skillbooks?: HeroSkillBook[]
  data?: ModelHeroDetail
  className?: string
}

export const SkillbooksSection = ({
  data,
  className,
}: SkillbookSectionProps) => {
  const skillbooks = data?.heroSkillbook?.map((sb) => {
    return {
      id: sb.id,
      name: sb.name,
      total: sb.total,
      properties: sb.info?.map((i) => {
        return {
          name: i.name,
          value: i.value,
        }
      }),
    } as HeroSkillBook
  })

  return (
    <div className={cx('space-y-2', className)}>
      <Heading as="h3">Skillbooks</Heading>
      <Card className="mt-2 py-6 space-y-6 h-[428px] overflow-y-auto">
        {skillbooks?.length ? (
          skillbooks?.map(({ id, name, total, properties }) => (
            <Skillbook
              key={id}
              name={name}
              numOfBooks={total}
              props={properties as SkillPropertyProps[]}
            />
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <Empty type="data" />
          </div>
        )}
      </Card>
    </div>
  )
}
