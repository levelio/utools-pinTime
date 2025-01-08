import {
  Cross1Icon,
  PauseIcon,
  PlayIcon,
  ReloadIcon,
} from '@radix-ui/react-icons'
import * as Separator from '@radix-ui/react-separator'

interface Props {
  type: 'countdown+' | 'countdown-' | 'date'
  enable: boolean
  options: {
    title: string
    countdown?: number
    fontSize?: number
    fontColor?: string
    mouseEventIgnored?: boolean
    status?: 'running' | 'paused'
  }
}

export function ListItem(props: Props) {
  return (
    <div class="bg-white rounded-md shadow-md my-4">
      <div className="text-mauve11 rounded-t-md text-lg font-bold py-2.5 px-4 m-0 flex justify-between items-center">
        <input className="text-mauve11 bg-transparent border-none focus:outline-none w-full text-lg" type="text" value={props.options.title} />
        <div className="cursor-pointer">
          <Cross1Icon />
        </div>
      </div>
      <Separator.Root className="mx-2 h-1px box-border bg-violet6 " />

      <div className="flex justify-between item-center py-2 px-4">
        <div className="flex item-center">
          <div className="flex item-center">
            <span className="text-violet11 mr-2">颜色:</span>
            <input type="color" value={props.options.fontColor || '#8B5CF6'} />
          </div>
          <div className="flex item-center ml-4">
            <span className="text-violet11 mr-2">字号:</span>
            <input type="range" min={20} max={100} step={1} value={props.options.fontSize || 20} />
          </div>
          <div className="flex item-center ml-4">
            <span className="text-violet11 mr-2">锁定:</span>
            <input type="checkbox" />
          </div>
        </div>
        <div>

          {
            props.enable
              ? (
                  <button
                    className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-red-7 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-red-6 cursor-pointer"
                    style={{ marginLeft: 'auto' }}
                  >
                    关闭
                  </button>
                )
              : (
                  <button
                    className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-green-7 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-green-6 cursor-pointer"
                    style={{ marginLeft: 'auto' }}
                  >
                    启用
                  </button>
                )
          }
        </div>

      </div>

    </div>
  )
}
