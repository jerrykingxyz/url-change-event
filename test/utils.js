export function sleep(time) {
  return new Promise((res) => setTimeout(res, time))
}

export function expectURLEqual(url1, url2) {
  expect(url1.href).to.equal(url2.href)
}

export function waitForUrlChange(trigger, onChange) {
  return new Promise((res) => {
    const callback = function (event) {
      if (typeof onChange === 'function') {
        onChange(event)
      }
      window.removeEventListener('urlchangeevent', callback)
      res()
    }
    window.addEventListener('urlchangeevent', callback)
    if (typeof trigger === 'function') {
      trigger()
    }
  })
}

export function waitForPopstate(trigger, onChange) {
  return new Promise((res) => {
    const callback = function (event) {
      if (typeof onChange === 'function') {
        onChange(event)
      }
      window.removeEventListener('popstate', callback)
      res()
    }
    window.addEventListener('popstate', callback)
    if (typeof trigger === 'function') {
      trigger()
    }
  })
}
