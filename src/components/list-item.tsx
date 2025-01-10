import type { ListItemType } from '../types'
import * as Separator from '@radix-ui/react-separator'
import { useRef, useState } from 'preact/compat'

interface Props {
  type: ListItemType
  options: {
    title: string
    countdown?: number
    fontSize: number
    fontColor: string
  }
  openWindow: (type: ListItemType, options: { countdown?: number }) => void
  closeWindow: (type: ListItemType) => void
  onConfigChange: (type: ListItemType, options: { fontSize?: number, fontColor?: string, countdown?: number }) => void
}

export function ListItem(props: Props) {
  const [color, setColor] = useState(props.options.fontColor)
  const colorRef = useRef<HTMLInputElement>(null)

  const handleFontSizeChange = (e: any) => {
    const fontSize = Number.parseInt(e.target?.value)
    props.onConfigChange(props.type, { fontSize })
  }

  const handleClickColorButton = () => {
    if (colorRef.current) {
      colorRef.current.click()
    }
  }

  const handleFontColorChange = (e: any) => {
    const fontColor = e.target?.value
    props.onConfigChange(props.type, { fontColor })
    setColor(fontColor)
  }

  const handleCountdownChange = (e: any) => {
    const countdown = Number.parseInt(e.target?.value)
    props.onConfigChange(props.type, { countdown })
  }

  return (
    <div class="bg-white rounded-md shadow-md my-4">
      <div className="text-mauve11 rounded-t-md text-lg font-bold py-2.5 px-4 m-0 flex justify-between items-center">
        <span>{props.options.title}</span>
      </div>

      <Separator.Root className="mx-2 h-1px box-border bg-violet6 " />

      <div className="flex justify-between item-center py-2 px-4">
        <div className="flex item-center">
          <div className="flex item-center">
            <span className="text-violet11 mr-2">颜色:</span>
            <div className="w-12 h-6 cursor-pointer rounded-md" onClick={handleClickColorButton} style={{ backgroundColor: color }}></div>
            <input ref={colorRef} className="w0 h0 opacity-0 absolute" type="color" onInput={handleFontColorChange} />
          </div>
          <div className="flex item-center ml-4">
            <span className="text-violet11 mr-2">字号:</span>
            <input onInput={handleFontSizeChange} type="range" min={20} max={100} step={1} value={props.options.fontSize || 20} />
          </div>
          {
            props.type === 'countdown' && (
              <div className="flex item-center ml-4">
                <span className="text-violet11 mr-2">计时分钟:</span>
                <input className="bg-violet6 border-1 text-violet11 rounded-md px-2" onInput={handleCountdownChange} type="number" min={1} max={99999} step={1} value={props.options.countdown || 25} />
              </div>
            )
          }
        </div>
        <div>
          <button
            className="mx-2 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-green-4 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-green-6 cursor-pointer"
            onClick={props.openWindow.bind(null, props.type, { countdown: props.options.countdown || 25 })}
          >
            创建
          </button>
          <button
            className="mx-2 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-red-4 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-red-6 cursor-pointer"
            onClick={props.closeWindow.bind(null, props.type)}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
