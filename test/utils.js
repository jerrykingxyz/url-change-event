export const waitForUrlChange = function(listener) {
  return new Promise(res => {
    const newListener = function(event) {
      listener(event)
      window.removeEventListener('urlchangeevent', newListener)
      res()
    }
    window.addEventListener('urlchangeevent', newListener)
  })
}

export const waitForPopstate = function() {
  return new Promise(res => {
    const callback = function() {
      res()
      window.removeEventListener('popstate', callback)
    }

    window.addEventListener('popstate', callback)
  })
}
