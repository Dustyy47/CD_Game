import { useRef, useState } from 'react'

function padZero(num: number) {
  if (num < 10) return '0' + num
  return '' + num
}

export function getFormattedTime(seconds: number) {
  const main = Math.floor(seconds / 60)
  const rest = seconds - main * 60
  return padZero(main) + ':' + padZero(rest)
}

// it is updating when updateTrigger is changed
export function useTimer(onTimeEnd: () => void) {
  const [value, setTimerValue] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const isExpired = useRef<boolean>(false)
  const timer = useRef<NodeJS.Timer>()

  // clear timer values
  function clear() {
    setTimerValue(0)
    setTotalTime(0)
    clearInterval(timer.current)
  }

  // refresh timer and setup interval but dont refresh total time
  function refresh(startTime: number) {
    isExpired.current = false
    clearInterval(timer.current)
    setTimerValue(startTime)
    timer.current = setInterval(() => {
      console.log('timer update')
      setTotalTime((prev) => ++prev)
      setTimerValue((prev) => {
        prev -= 1
        if (prev <= 0) {
          clearInterval(timer.current)
          onTimeEnd()
          console.log('timer end')
          isExpired.current = true
        }
        return prev
      })
    }, 1000)
  }

  return {
    value,
    setTimerValue,
    totalTime,
    refresh,
    clear,
    isExpired: isExpired.current
  }
}
