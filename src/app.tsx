import type { WindowStyle } from './hooks/usePageReducer'

import type { ListItemType } from './types'
import { ListItem } from './components/list-item'
import { usePageReducer } from './hooks/usePageReducer'
import './app.css'

export function App() {
  const { state, dispatch } = usePageReducer()

  const handleOpenWindow = (type: ListItemType) => () => {
    dispatch({ type: 'OPEN_WINDOW', payload: { type } })
  }

  const closeWindow = (type: ListItemType) => () => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { type } })
  }

  const handlerOnStyleChange = (type: ListItemType, options: Partial<WindowStyle>) => {
    dispatch({ type: 'CHANGE_WINDOW_CONFIG', payload: { type, options } })
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-violet-400">
          <span className="text-violet-7">P</span>
          <span className="text-violet-6">i</span>
          <span className="text-violet-5">n</span>
          <span className="text-violet-6">T</span>
          <span className="text-violet-5">i</span>
          <span className="text-violet-4">m</span>
          <span className="text-violet-3">e</span>
        </h1>
        <div className="flex justify-end">
          <button className="bg-violet-5 text-white px-4 py-2 rounded-md" onClick={() => dispatch({ type: 'IGNORE_MOUSE_EVENTS' })}>{state.ignoreMouseEvents ? '关闭当前窗口鼠标事件' : '开启当前窗口鼠标事件'}</button>
          <button className="bg-violet-5 text-white px-4 py-2 rounded-md ml-2" onClick={() => dispatch({ type: 'CLOSE_ALL_WINDOW' })}>关闭所有窗口</button>
        </div>
      </div>

      <main>
        {
          state.windowList.map(type => (
            <ListItem key={type} type={type} options={state[type]} openWindow={handleOpenWindow(type)} onConfigChange={handlerOnStyleChange} closeWindow={closeWindow(type)} />
          ))
        }
      </main>
    </div>
  )
}
