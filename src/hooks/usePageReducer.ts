import { useReducer } from 'preact/compat'
import { ListItemType } from '../types'

interface WindowConfig {
  title: string
  winId: number
  fontSize: number
  fontColor: string
  countdown?: number
}

export interface WindowStyle {
  fontSize: number
  fontColor: string
  countdown: number
}

interface State {
  [ListItemType.date]: WindowConfig
  [ListItemType.countdown]: WindowConfig
  [ListItemType.timing]: WindowConfig
  ignoreMouseEvents: boolean
  windowList: ListItemType[]
}

type Action =
  { type: 'OPEN_WINDOW', payload: { type: ListItemType } } |
  { type: 'CLOSE_ALL_WINDOW' } |
  { type: 'CLOSE_WINDOW', payload: { type: ListItemType } } |
  { type: 'CHANGE_WINDOW_CONFIG', payload: { type: ListItemType, options: Partial<WindowStyle> } } |
  { type: 'IGNORE_MOUSE_EVENTS' }

const defaultWindowConfig: Record<ListItemType, WindowConfig> = {
  [ListItemType.date]: {
    title: '时钟',
    fontSize: 24,
    fontColor: '#F93827',
    winId: -1,
  },
  [ListItemType.countdown]: {
    title: '倒计时',
    fontSize: 24,
    fontColor: '#16C47F',
    winId: -1,
    countdown: 25,
  },
  [ListItemType.timing]: {
    title: '计时器',
    fontSize: 24,
    fontColor: '#FFD65A',
    winId: -1,
  },
}

const initialState: State = {
  ignoreMouseEvents: false,
  [ListItemType.date]: getWindowConfigByDB(ListItemType.date),
  [ListItemType.countdown]: getWindowConfigByDB(ListItemType.countdown),
  [ListItemType.timing]: getWindowConfigByDB(ListItemType.timing),
  windowList: [
    ListItemType.date,
    ListItemType.countdown,
    ListItemType.timing,
  ],
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_WINDOW': return openWindow(state, action.payload.type)
    case 'CLOSE_WINDOW': return closeWindow(state, action.payload.type)
    case 'CLOSE_ALL_WINDOW': return closeAllWindows(state)
    case 'CHANGE_WINDOW_CONFIG': return changeWindowConfig(state, action.payload.type, action.payload.options)
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

function closeWindow(state: State, type: ListItemType) {
  const winConfig = state[type]
  if (winConfig.winId !== -1) {
    window.services.closeWindow(winConfig.winId)
  }
  return state
}

function closeAllWindows(state: State) {
  window.services.closeAllWindows()
  return state
}

function changeWindowConfig(state: State, type: ListItemType, options: Partial<WindowStyle>) {
  const winConfig = state[type]
  let nextState = state
  if (options.fontSize) {
    window.services.changeStyle(winConfig.winId, 'font-size', options.fontSize)
    const typeState = { ...winConfig, fontSize: options.fontSize }
    nextState = { ...state, [type]: typeState }
    window.utools.dbStorage.setItem(`window-config-${type}`, JSON.stringify(typeState))
  }
  if (options.fontColor) {
    window.services.changeStyle(winConfig.winId, 'font-color', options.fontColor)
    const typeState = { ...winConfig, fontColor: options.fontColor }
    nextState = {
      ...state,
      [type]: typeState,
    }
    window.utools.dbStorage.setItem(`window-config-${type}`, JSON.stringify(typeState))
  }

  if (options.countdown) {
    const typeState = { ...winConfig, countdown: options.countdown }
    nextState = {
      ...state,
      [type]: typeState,
    }
    window.utools.dbStorage.setItem(`window-config-${type}`, JSON.stringify(typeState))
  }

  return nextState
}

function ignoreMouseEvents(state: State) {
  const ignoreMouseEvents = !state.ignoreMouseEvents
  window.services.changeIgnoreAllWindowMouseEvents(ignoreMouseEvents)
  return { ...state, ignoreMouseEvents }
}

function getWindowConfigByDB(type: ListItemType) {
  const config = window.utools.dbStorage.getItem(`window-config-${type}`)
  if (config) {
    return { ...JSON.parse(config), winId: -1 }
  }
  return { ...defaultWindowConfig[type], winId: -1 }
}
