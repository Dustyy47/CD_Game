import { GameScreen } from './screens/GameScreen'

export interface GameConfig {
  couples: number
  startTime: number
  minTime: number
  timeDecreasment: number
}

const CONFIG: GameConfig = {
  couples: 8,
  startTime: 60,
  minTime: 20,
  timeDecreasment: 5
}

function App() {
  return (
    <>
      <GameScreen config={CONFIG} />
    </>
  )
}

export default App
