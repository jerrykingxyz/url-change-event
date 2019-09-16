let nowURL = window.location.href
const updateNowURL = function() {
  nowURL = window.location.href
}

class UrlChangeEvent extends Event {
  constructor(option = {}) {
    super('urlchangeevent', option)
    this.newURL = option.newURL
    this.oldURL = option.oldURL
  }

  get [Symbol.toStringTag]() {
    return 'UrlChangeEvent'
  }
}

const _pushState = window.history.pushState
window.history.pushState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: nowURL,
      cancelable: true,
    })
  )

  if (notCanceled) {
    _pushState.call(window.history, state, title, url)
    updateNowURL()
  }
}

const _replaceState = window.history.replaceState
window.history.replaceState = function(state, title, url) {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      newURL: url,
      oldURL: nowURL,
      cancelable: true,
    })
  )

  if (notCanceled) {
    _replaceState.call(window.history, state, title, url)
    updateNowURL()
  }
}

window.addEventListener('popstate', function() {
  window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: nowURL,
      newURL: window.location.href,
    })
  )
  updateNowURL()
})

window.addEventListener('beforeunload', function() {
  const notCanceled = window.dispatchEvent(
    new UrlChangeEvent({
      oldURL: nowURL,
      cancelable: true,
    })
  )

  if (!notCanceled) {
    const confirmationMessage = 'o/'
    e.returnValue = confirmationMessage
    return confirmationMessage
  }
})
