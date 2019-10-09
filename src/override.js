import UrlChangeEvent from './UrlChangeEvent'
import { cachePath, updateCacheState } from './utils/stateCache'

export const originPushState = window.history.pushState.bind(window.history)
window.history.pushState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: cachePath,
      cancelable: true,
      action: 'pushState',
    })
  )

  if (notCanceled) {
    originPushState({ _index: window.history.length + 1, ...state }, title, url)
    updateCacheState()
  }
}

export const originReplaceState = window.history.replaceState.bind(
  window.history
)
window.history.replaceState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: cachePath,
      cancelable: true,
      action: 'replaceState',
    })
  )

  if (notCanceled) {
    originReplaceState({ _index: window.history.length, ...state }, title, url)
    updateCacheState()
  }
}
