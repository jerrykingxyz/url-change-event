import UrlChangeEvent from './UrlChangeEvent'
import { initState, cacheURL, cacheIndex, updateCacheState } from './stateCache'
import './override'

window.addEventListener('popstate', function (e) {
  initState()
  const nowIndex = window.history.state &&  window.history.state._index
  const nowURL = new URL(window.location)
  if (nowIndex === cacheIndex) {
    e.stopImmediatePropagation()
    return
  }

  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cacheURL,
      newURL: nowURL,
      action: 'popstate',
    })
  )

  if (!notCanceled) {
    e.stopImmediatePropagation()
    window.history.go(cacheIndex - nowIndex)
    return
  }
  updateCacheState()
})

window.addEventListener('beforeunload', function (e) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cacheURL,
      newURL: null,
      action: 'beforeunload',
    })
  )

  if (!notCanceled) {
    e.preventDefault()
    const confirmationMessage = 'o/'
    e.returnValue = confirmationMessage
    return confirmationMessage
  }
})
