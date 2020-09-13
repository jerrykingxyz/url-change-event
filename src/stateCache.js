import { originReplaceState } from './override'

export let cacheURL
export let cacheIndex

function initCache() {
  const state = window.history.state
  if (!state || typeof state._index !== 'number') {
    originReplaceState({ _index: window.history.length, ...state }, null, null)
  }
  updateCacheState()
}

initCache()

export function updateCacheState() {
  cacheURL = new URL(window.location.href)
  cacheIndex = window.history.state._index
}
