export interface GameResults {
  lastRound: string
  totalTime: string
}

const RECORD_ROUND_LABEL = 'recordRound'
const RECORD_TIME_LABEL = 'recordTime'

class GameRecord {
  isRecord(results: GameResults) {
    const record = this.getRecord()
    if (record.lastRound > results.lastRound) return false
    if (record.lastRound < results.lastRound) return true
    if (record.totalTime > results.totalTime) return true
    return false
  }

  getRecord(): GameResults {
    return {
      lastRound: localStorage.getItem(RECORD_ROUND_LABEL) ?? '',
      totalTime: localStorage.getItem(RECORD_TIME_LABEL) ?? ''
    }
  }
  trySetRecord(results: GameResults) {
    if (!this.isRecord(results)) return false
    localStorage.setItem(RECORD_ROUND_LABEL, results.lastRound)
    localStorage.setItem(RECORD_TIME_LABEL, results.totalTime)
    return true
  }
}

export default new GameRecord()
