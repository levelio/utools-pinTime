import { useReducer } from 'preact/compat'

interface State {}

interface Action { type: '' }

const initialState: State = {}

function reducer(state: State, action: Action) {
  switch (action.type) {
    default:
      return state
  }
}

export function usePageReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
