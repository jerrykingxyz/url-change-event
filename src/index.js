import { originReplaceState } from './override'

if (!window.history.state) {
  originReplaceState({ _index: window.history.length }, null, null)
}

export * from './override'
