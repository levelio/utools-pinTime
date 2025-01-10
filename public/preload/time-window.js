const { ipcRenderer } = require('electron')

console.log('time-window.js loaded')

ipcRenderer.on('change-style-font-color', (_event, color) => {
  document.querySelector('#root').style.color = color
})

ipcRenderer.on('change-style-font-size', (_event, size) => {
  document.querySelector('#root').style.fontSize = `${size}px`
})

ipcRenderer.on('change-style-font-family', (_event, family) => {
  document.querySelector('#root').style.fontFamily = family
})

ipcRenderer.on('change-countdown-time', (event, time) => {
  console.log('countdown-time-change', event, time)
})

ipcRenderer.on('countdown-start', (event) => {
  console.log('countdown-start', event)
})

ipcRenderer.on('countdown-pause', (event) => {
  console.log('countdown-pause', event)
})
