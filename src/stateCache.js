import { originReplaceState } from './override'

export let cacheURL
export let cacheIndex

export function initState() {
  const state = window.history.state
  if (!state || typeof state._index !== 'number') {
    const _index = window.history.length
    originReplaceState({ _index, ...state }, '')
    return _index
  }
  return state._index
}

export function updateCacheState(index) {
  cacheURL = new URL(window.location.href)
  cacheIndex = index
}

updateCacheState(initState())
