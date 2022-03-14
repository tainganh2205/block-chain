import { ReactComponent as Gem } from '../svg/gem.svg'

interface Props {
  blur?: boolean
}

export const IconGem = (props: Props) => {
  const { blur = true } = props
  return (
    <div className="relative flex items-center justify-center w-[120px] h-[150px] mx-auto">
      <div className="w-[120px] h-[150px] flex items-center justify-center">
        <Gem className="scale-[1.6]" />
      </div>
      {blur && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: -1,
            filter: 'blur(50px)',
            backgroundColor: '#32A7AF',
            opacity: 0.2,
          }}
        />
      )}
    </div>
  )
}

export default IconGem
