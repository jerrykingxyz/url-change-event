import UrlChangeEvent from './UrlChangeEvent'
import { nowURL, updateNowURL } from './utils/urlCache'

export const originPushState = window.history.pushState.bind(window.history)
window.history.pushState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: nowURL,
      cancelable: true,
    })
  )

  if (notCanceled) {
    originPushState({ _index: window.history.length + 1, ...state }, title, url)
    updateNowURL()
  }
}

export const originReplaceState = window.history.replaceState.bind(
  window.history
)
window.history.replaceState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: nowURL,
      cancelable: true,
    })
  )

  if (notCanceled) {
    originReplaceState({ _index: window.history.length, ...state }, title, url)
    updateNowURL()
  }
}
