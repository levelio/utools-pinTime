import { render } from 'preact'
import { App } from './app.tsx'

import 'virtual:uno.css'
import './index.css'

render(<App />, document.getElementById('app')!)
