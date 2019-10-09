import UrlChangeEvent from './UrlChangeEvent'
import { originReplaceState } from './override'
import { cachePath, cacheIndex, updateCacheState } from './utils/stateCache'

export * from './override'

if (!window.history.state) {
  // init env
  originReplaceState({ _index: window.history.length }, null, null)
}
updateCacheState()

window.addEventListener('popstate', function(e) {
  const nowIndex = window.history.state._index
  const nowPath = window.location.pathname
  if (nowIndex === cacheIndex) {
    e.stopImmediatePropagation()
    return
  }

  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cachePath,
      newURL: nowPath,
      cancelable: true,
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

window.addEventListener('beforeunload', function(e) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: cachePath,
      cancelable: true,
      action: 'beforeunload',
    })
  )

  if (!notCanceled) {
    const confirmationMessage = 'o/'
    e.returnValue = confirmationMessage
    return confirmationMessage
  }
})
