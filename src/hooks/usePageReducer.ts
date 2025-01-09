import type { ListItemType } from '../components/list-item'
import { useReducer } from 'preact/compat'

interface WindowConfig {
  title: string
  winId: number
  fontSize: number
  fontColor: string
  countdown?: number
}

interface State {
  [ListItemType.date]: WindowConfig
  [ListItemType.countdown]: WindowConfig
  [ListItemType.timing]: WindowConfig
  ignoreMouseEvents: boolean
}

type Action =
  { type: 'OPEN_WINDOW', payload: { type: ListItemType } } |
  { type: 'CLOSE_ALL_WINDOW' } |
  { type: 'CLOSE_WINDOW', payload: { winId: number } } |
  { type: 'CHANGE_WINDOW_STYLE', payload: { type: ListItemType, key: keyof WindowConfig, value: unknown } } |
  { type: 'IGNORE_MOUSE_EVENTS' }

const initialState: State = {
  ignoreMouseEvents: false,
  date: {
    title: '时钟',
    fontSize: 24,
    fontColor: '#F93827',
    winId: -1,
  },
  countdown: {
    title: '倒计时',
    fontSize: 24,
    fontColor: '#16C47F',
    winId: -1,
    countdown: 25,
  },
  timing: {
    title: '计时器',
    fontSize: 24,
    fontColor: '#FFD65A',
    winId: -1,
  },
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_WINDOW': return openWindow(state, action.payload.type)
    case 'CLOSE_WINDOW': return closeWindow(state, action.payload.winId)
    case 'CLOSE_ALL_WINDOW': return closeAllWindows(state)
    case 'CHANGE_WINDOW_STYLE': return changeWindowStyle(state, action.payload.type, action.payload.key, action.payload.value)
    case 'IGNORE_MOUSE_EVENTS': return ignoreMouseEvents(state)
    default:
      return state
  }
}

export function usePageReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

function openWindow(state: State, type: ListItemType) {
  const winConfig = state[type]
  if (winConfig.winId !== -1) {
    window.services.closeWindow(winConfig.winId)
  }
  console.log('open window', type, winConfig)

  const id = window.services.openTimeWindow(type, winConfig)
  switch (type) {
    case 'date':
      return {
        ...state,
        date: {
          ...winConfig,
          winId: id,
        },
      }
    case 'countdown':
      return {
        ...state,
        countdown: {
          ...winConfig,
          winId: id,
        },
      }
    case 'timing':
      return {
        ...state,
        timing: {
          ...winConfig,
          winId: id,
        },
      }
    default:
      return state
  }
}

function closeWindow(state: State, winId: number) {
  window.services.closeWindow(winId)
  return state
}

function closeAllWindows(state: State) {
  window.services.closeAllWindows()
  return state
}

function changeWindowStyle(state: State, type: ListItemType, key: keyof WindowConfig, value: unknown) {
  const winConfig = state[type]
  window.services.changeStyle(winConfig.winId, key, value)
  if (key === 'fontSize') {
    return {
      ...state,
      [type]: {
        ...winConfig,
        fontSize: value as number,
      },
    }
  }
  else if (key === 'fontColor') {
    return {
      ...state,
      [type]: {
        ...winConfig,
        fontColor: value as string,
      },
    }
  }

  return state
}

function ignoreMouseEvents(state: State) {
  const ignoreMouseEvents = !state.ignoreMouseEvents
  window.services.changeIgnoreAllWindowMouseEvents(ignoreMouseEvents)
  return { ...state, ignoreMouseEvents }
}
