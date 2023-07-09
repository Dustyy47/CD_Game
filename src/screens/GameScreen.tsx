import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GameConfig } from '../App'
import { InfoDisplay } from '../components/InfoDisplay'
import { ResultMemo } from '../components/Result'
import { TilesBoard } from '../components/TilesBoard'
import { tiles } from '../data/tiles'
import { getFormattedTime, useTimer } from '../hooks/useTimer'

interface GameScreenProps {
  config: GameConfig
}

export function GameScreen({ config }: GameScreenProps) {
  const [round, setRound] = useState(1)
  const [timerStartTime, setTimerStartTime] = useState(config.startTime)
  const [matchedCount, setMatchedCount] = useState(0)
  const [isResultShowed, setResultShowed] = useState(false)
  const [attempt, setAttempt] = useState(1)

  const timer = useTimer(() => {
    setResultShowed(true)
  })

  // start game, init timer
  useEffect(() => {
    timer.refresh(config.startTime)
  }, [])

  // calls when user win round
  function handleSolve() {
    // we shouldnt got to the next round if the timer has expired but end game window is still not opened (but is opening)
    if (timer.isExpired) return
    setMatchedCount(0)
    setRound((prev) => ++prev)
    const newStartTime =
      timerStartTime - config.timeDecreasment < config.minTime
        ? config.minTime
        : timerStartTime - config.timeDecreasment
    setTimerStartTime(newStartTime)
    timer.refresh(newStartTime)
  }

  const handleCloseResults = useCallback(async function () {
    setResultShowed(false)
    setTimerStartTime(config.startTime)
    setMatchedCount(0)
    setAttempt((prev) => ++prev)
    // a delay so that the player does not see how the total time and round are reset
    //  while the animation of hiding the screen with the results takes place
    await new Promise((res) => setTimeout(res, 100))
    setRound(1)
    timer.clear()
    timer.refresh(config.startTime)
  }, [])

  const results = useMemo(() => {
    return { totalTime: '' + timer.totalTime, lastRound: '' + round }
  }, [isResultShowed])

  // get style for timer depend on rest time
  const timeStyle = (() => {
    if (timer.value <= timerStartTime / 5) return 'text-red'
    if (timer.value <= timerStartTime / 2) return 'text-yellow'
    return 'text-lime'
  })()

  return (
    <>
      <div className=' mx-auto md:w-full max-w-[35rem] sm:w-[95%] absolute translate-y-[50%] bottom-[50%] left-0 right-0'>
        <div className='flex justify-between mb-4'>
          <InfoDisplay className='[width:calc(50%-.25rem)] text-white'>
            {'Раунд ' + round}
          </InfoDisplay>
          <InfoDisplay
            className={classNames('[width:calc(50%-.25rem)]', timeStyle)}
          >
            {getFormattedTime(timer.value)}
          </InfoDisplay>
        </div>
        <TilesBoard
          config={config}
          tiles={tiles}
          onSolve={handleSolve}
          matchedCount={matchedCount}
          setMatchedCount={setMatchedCount}
          attempt={attempt}
        />
        <InfoDisplay className='mt-4 text-white'>
          {matchedCount + ' / ' + config.couples}
        </InfoDisplay>
      </div>

      <ResultMemo
        isOpen={isResultShowed}
        close={handleCloseResults}
        results={results}
      />
    </>
  )
}
