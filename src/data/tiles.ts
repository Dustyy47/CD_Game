import { Tile, TileState } from '../components/Tile'

const COMMON_ROUTE = './images/tiles/'
const DEFAULT_STATE: TileState = 'closed'

export const tiles: Tile[] = [
  {
    id: '1',
    img: COMMON_ROUTE + 'cs.png',
    state: DEFAULT_STATE
  },
  {
    id: '2',
    img: COMMON_ROUTE + 'c++.png',
    state: DEFAULT_STATE
  },
  {
    id: '3',
    img: COMMON_ROUTE + 'go.png',
    state: DEFAULT_STATE
  },
  {
    id: '4',

    img: COMMON_ROUTE + 'js.png',
    state: DEFAULT_STATE
  },
  {
    id: '5',
    img: COMMON_ROUTE + 'kotlin.png',
    state: DEFAULT_STATE
  },
  {
    id: '6',
    img: COMMON_ROUTE + 'java.png',
    state: DEFAULT_STATE
  },
  {
    id: '7',
    img: COMMON_ROUTE + 'ruby.png',
    state: DEFAULT_STATE
  },
  {
    id: '8',
    img: COMMON_ROUTE + 'python.png',
    state: DEFAULT_STATE
  }
]
