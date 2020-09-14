import { originReplaceState } from './override'

export let cacheURL
export let cacheIndex

export function initState() {
  const state = window.history.state
  if (!state || typeof state._index !== 'number') {
    originReplaceState({ _index: window.history.length, ...state }, null, null)
  }
}

export function updateCacheState() {
  cacheURL = new URL(window.location.href)
  cacheIndex = window.history.state._index
}

initState()
updateCacheState()
