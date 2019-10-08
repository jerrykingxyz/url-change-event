import UrlChangeEvent from './UrlChangeEvent'
import { originReplaceState } from './override'
import { nowURL, updateNowURL } from './utils/urlCache'

export * from './override'

if (!window.history.state) {
  originReplaceState({ _index: window.history.length }, null, null)
}

window.addEventListener('popstate', function() {
  window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: nowURL,
      newURL: window.location.pathname,
      cancelable: true,
      action: 'popstate',
    })
  )

  updateNowURL()
})

window.addEventListener('beforeunload', function() {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: nowURL,
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
