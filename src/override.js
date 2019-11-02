import UrlChangeEvent from './UrlChangeEvent'
import { cachePath, cacheIndex, updateCacheState } from './stateCache'

export const originPushState = window.history.pushState.bind(window.history)
window.history.pushState = function(state, title, url) {
  const absolutePath = new URL(url || '', window.location.href).pathname
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: absolutePath,
      oldURL: cachePath,
      action: 'pushState',
    })
  )

  if (notCanceled) {
    originPushState({ _index: cacheIndex + 1, ...state }, title, url)
    updateCacheState()
  }
}

export const originReplaceState = window.history.replaceState.bind(
  window.history
)
window.history.replaceState = function(state, title, url) {
  const absolutePath = new URL(url || '', window.location.href).pathname
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: absolutePath,
      oldURL: cachePath,
      action: 'replaceState',
    })
  )

  if (notCanceled) {
    originReplaceState({ _index: cacheIndex, ...state }, title, url)
    updateCacheState()
  }
}
