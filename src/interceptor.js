import { originPushState } from './override'

let mounted = false

export function mount() {
  if (mounted) {
    return
  }
  originPushState()
}

export function unmount() {}
