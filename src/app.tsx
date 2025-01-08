import { ListItem } from './components/list-item'

import { usePageReducer } from './hooks/usePageReducer'
import './app.css'

export function App() {
  const { state, dispatch } = usePageReducer()

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
        <div className="">
          <button className="bg-violet-5 text-white px-4 py-2 rounded-md">新建时钟</button>
          <button className="bg-violet-5 text-white px-4 py-2 rounded-md mx-2">新建正计时</button>
          <button className="bg-violet-5 text-white px-4 py-2 rounded-md">新建倒计时</button>
        </div>
      </div>
      <main>
        <ListItem type="countdown-" options={{ title: '倒计时', countdown: 20, fontSize: 20, fontColor: '#00ff00' }} enable={true} />
        <ListItem type="countdown+" options={{ title: '正计时', fontSize: 30, fontColor: '#0000ff' }} enable={false} />
        <ListItem type="date" options={{ title: '时钟', fontSize: 40, fontColor: '#ff0000' }} enable={true} />
      </main>
    </div>

  )
}
