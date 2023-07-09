import classNames from 'classnames'
import { memo } from 'react'
import GameRecord, { GameResults } from '../helpers/GameRecord'
import { getFormattedTime } from '../hooks/useTimer'
import { Button } from './Button'

interface ResultDataProps {
  results: GameResults
  children: string
}
export function ResultData({ results, children }: ResultDataProps) {
  return (
    <>
      <h2 className='text-yellow text-[24px] text-center mb-2'>{children}</h2>
      <p className='boldFont text-[20px] text-white text-center mb-2'>
        Макс. раунд: <span className='text-lime'>{results.lastRound}</span>
      </p>
      <p className='boldFont text-[20px] text-white text-center mb-8'>
        Суммарное время:{' '}
        <span className='text-lime '>
          {getFormattedTime(+results.totalTime)}
        </span>
      </p>
    </>
  )
}

function renderResultMessage(results: GameResults) {
  const res = GameRecord.trySetRecord(results)
  const record = GameRecord.getRecord()
  if (res) {
    return (
      <>
        <h3 className='upperFont text-lime mb-1 text-center'>РЕКОРД</h3>
        <img
          className='mb-12 w-12 mx-auto'
          src='./images/star.svg'
          alt='record'
        />
      </>
    )
  } else {
    return (
      <>
        <h3 className='upperFont text-lime mb-12 text-center'>
          Хорошая попытка!
        </h3>
        <ResultData results={record}>Рекорд:</ResultData>
      </>
    )
  }
}

interface ResultProps {
  results: GameResults
  isOpen: boolean
  close: () => void
}

function Result({ results, isOpen, close: setOpen }: ResultProps) {
  const baseStyle = 'bg-black z-50 absolute overflow-hidden w-full bottom-0 '
  const stateStyle = isOpen ? 'h-screen' : 'h-0'

  return (
    <div className={classNames(baseStyle, stateStyle)}>
      <div className='max-w-[15rem] h-full pt-[10rem] mx-auto flex flex-col items-center'>
        <div className='flex flex-col'>
          {renderResultMessage(results)}
          <ResultData results={results}>Ваш результат:</ResultData>
        </div>
        <Button onClick={setOpen} styleType='lime'>
          Играть ещё
        </Button>
      </div>
    </div>
  )
}

export const ResultMemo = memo(Result)
