interface Window {
  services: {
    openTimeWindow: (type: string, options: { countdown?: number }) => number
    changeStyle: (id: number, key: string, value: unknown) => void
    changeIgnoreMouseEvents: (id: number, value: boolean) => void
    changeIgnoreAllWindowMouseEvents: (value: boolean) => void
    closeWindow: (id: number) => void
    closeAllWindows: () => void
  }
}
