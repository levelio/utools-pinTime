import * as Separator from '@radix-ui/react-separator'

export enum ListItemType {
  countdown = 'countdown',
  timing = 'timing',
  date = 'date',
}

interface Props {
  type: ListItemType
  options: {
    title: string
    countdown?: number
    fontSize: number
    fontColor: string
  }
  openWindow: (type: ListItemType, options: { countdown?: number }) => void
}

export function ListItem(props: Props) {
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
            <input type="color" value={props.options.fontColor || '#8B5CF6'} />
          </div>
          <div className="flex item-center ml-4">
            <span className="text-violet11 mr-2">字号:</span>
            <input type="range" min={20} max={100} step={1} value={props.options.fontSize || 20} />
          </div>
          {
            props.type === 'countdown' && (
              <div className="flex item-center ml-4">
                <span className="text-violet11 mr-2">计时分钟:</span>
                <input type="number" min={1} max={99999} step={1} value={props.options.countdown || 25} />
              </div>
            )
          }
        </div>
        <div>
          <button
            className="inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-violet-5 px-2.5 text-[13px] leading-none text-white outline-none hover:bg-violet-6 cursor-pointer"
            onClick={props.openWindow.bind(null, props.type, { countdown: props.options.countdown || 25 })}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
