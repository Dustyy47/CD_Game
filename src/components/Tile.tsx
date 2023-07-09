import classNames from 'classnames'

export type TileState = 'closed' | 'active' | 'hidden'

export interface Tile {
  id: string
  state: TileState
  img: string
}

interface TileProps {
  data: Tile
  onClick?: (id: string) => void
}

export function Tile({ data, onClick }: TileProps) {
  const { id, state, img } = data

  const baseWrapperStyles =
    'rounded-common w-full aspect-square cursor-pointer bg-black flex items-center justify-center relative overflow-hidden'

  const stateStyles = classNames(
    state === 'active' && '[transform:rotateY(180deg)] pointer-events-none',
    state === 'hidden' && 'bg-greyLight pointer-events-none',
    state === 'closed' && '[transform:rotateY(0)]'
  )

  const placeholderStateStyles = classNames(
    state === 'active' && 'opacity-0',
    state === 'closed' && 'opacity-100'
  )

  const imgStateStyles = classNames(
    state === 'active' && 'opacity-100',
    state === 'closed' && 'opacity-0',
    state === 'hidden' && 'opacity-0'
  )

  function handleClick() {
    if (onClick) onClick(id)
  }

  return (
    <div
      onClick={handleClick}
      className={classNames(baseWrapperStyles, stateStyles)}
    >
      <img
        className={classNames(
          'absolute duration-100 h-[40%] object-cover',
          placeholderStateStyles
        )}
        src={'./images/question.svg'}
        alt='closed tile'
      />
      <img
        className={classNames(
          'absolute duration-100 h-[70%] object-cover [transform:rotateY(180deg)]',
          imgStateStyles
        )}
        src={img}
        alt='tile content'
      />
    </div>
  )
}
