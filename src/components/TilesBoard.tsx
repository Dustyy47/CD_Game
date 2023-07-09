import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { GameConfig } from '../App'
import { Tile } from './Tile'

const HIDE_INCORRECT_TIME = 750
const HIDE_CORRECT_TIME = 300

// sort tiles randomly, then pick only required count of elements, then make duplicates and sort again
function getPreparedTiles(tiles: Tile[], config: GameConfig) {
  return tiles
    .sort(() => Math.random() - 0.5)
    .slice(0, config.couples)
    .reduce((acc: Tile[], tile) => {
      const duplicate = { ...tile, id: tile.id + '_s' }
      return [...acc, tile, duplicate]
    }, [])
    .sort(() => Math.random() - 0.5)
}

interface TilesBoardProps {
  tiles: Tile[]
  config: GameConfig
  onSolve: () => void
  matchedCount: number
  setMatchedCount: React.Dispatch<React.SetStateAction<number>>
  attempt: number
}

export function TilesBoard({
  tiles,
  config,
  onSolve,
  matchedCount,
  setMatchedCount,
  attempt
}: TilesBoardProps) {
  const [firstPickedID, setFirstPickedID] = useState('')
  const [canPick, setCanPick] = useState(true)
  const [boardTiles, setTiles] = useState(getPreparedTiles(tiles, config))

  useEffect(() => {
    setFirstPickedID('')
    setTiles(getPreparedTiles(tiles, config))
  }, [attempt])

  function increaseMatchedCount() {
    setMatchedCount((prev) => ++prev)
    if (matchedCount + 1 === config.couples) {
      // the promise is for animation when all tiles after win became closed instead of hidden
      new Promise((res) => {
        setTiles((prev) => prev.map((tile) => ({ ...tile, state: 'closed' })))
        setTimeout(() => {
          res('')
        }, 300)
      }).then(() => {
        onSolve()
        setTiles(getPreparedTiles(tiles, config))
      })
    }
  }

  function handleClick(id: string) {
    // first tile is picked
    if (firstPickedID === '') {
      setFirstPickedID(id)
      setTiles((prev) =>
        prev.map((tile) =>
          tile.id === id ? { ...tile, state: 'active' } : tile
        )
      )
    }
    // second tile is picked
    else {
      setTiles((prev) =>
        prev.map((tile) =>
          tile.id === id || tile.id === firstPickedID
            ? { ...tile, state: 'active' }
            : tile
        )
      )
      // disable pick possibility for showing a tiles hiding animation
      setCanPick(false)

      // second picked tile is equal to first (MATCH!)
      // two equal tiles have id`s like 'X' and 'X_s'
      // make them hidden and increase matched count
      if (
        firstPickedID !== id &&
        firstPickedID.split('_')[0] === id.split('_')[0]
      ) {
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              tile.id === id || tile.id === firstPickedID
                ? { ...tile, state: 'hidden' }
                : tile
            )
          )
          setCanPick(true)
          increaseMatchedCount()
        }, HIDE_CORRECT_TIME)
      }
      // second picked tile is not equal to first, make them closed
      else {
        setTimeout(() => {
          setTiles((prev) =>
            prev.map((tile) =>
              tile.id === id || tile.id === firstPickedID
                ? { ...tile, state: 'closed' }
                : tile
            )
          )
          setCanPick(true)
        }, HIDE_INCORRECT_TIME)
      }
      setFirstPickedID('')
    }
  }

  const colsClassname = {
    2: 'grid-cols-2',
    8: 'grid-cols-4'
  }[config.couples]

  const boardClassname = classNames(
    ' grid [justify-content:space-between] sm:gap-[.5rem] ',
    canPick ? 'pointer-events-all' : 'pointer-events-none',
    colsClassname
  )

  return (
    <div className={boardClassname}>
      {boardTiles.map((tile) => (
        <Tile data={tile} key={tile.id} onClick={handleClick} />
      ))}
    </div>
  )
}
