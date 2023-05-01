import './reset.js'
import '../src/index'
import './UrlChangeEvent.test'
import './stateCache.test'
import './override.test'

import { cacheIndex, cacheURL } from '../src/stateCache'
import {
  sleep,
  expectURLEqual,
  waitForUrlChange,
  waitForPopstate,
} from './utils'

const initURL = cacheURL
const initIndex = cacheIndex

describe('popstate test', function () {
  it('history back test', async function () {
    const nextPath = '/nextState'
    const nextURL = new URL(nextPath, window.location.href)
    window.history.pushState(null, null, nextPath)

    let flag = false
    await waitForUrlChange(
      function () {
        window.history.back()
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, nextURL)
        expectURLEqual(event.newURL, initURL)
        expect(event.action).to.equal('popstate')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('history forward test', async function () {
    const nextPath = '/nextState'
    const nextURL = new URL(nextPath, window.location.href)
    window.history.pushState(null, null, nextPath)
    await waitForPopstate(function () {
      window.history.back()
    })

    let flag = false
    await waitForUrlChange(
      function () {
        window.history.forward()
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, nextURL)
        expect(event.action).to.equal('popstate')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex + 1)
    expectURLEqual(cacheURL, nextURL)

    await waitForPopstate(function () {
      window.history.back()
    })

    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent history change test', async function () {
    const nextPath = '/nextState'
    const nextURL = new URL(nextPath, window.location.href)
    window.history.pushState(null, null, nextPath)
    await waitForPopstate(function () {
      window.history.back()
    })

    let flag = false
    await waitForUrlChange(
      function () {
        window.history.forward()
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, nextURL)
        expect(event.action).to.equal('popstate')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent history change without popstate test', async function () {
    const nextPath = '/nextState'
    const nextURL = new URL(nextPath, window.location.href)
    window.history.pushState(null, null, nextPath)

    let popstateTimes = 0
    const onPopstate = function () {
      popstateTimes++
    }
    window.addEventListener('popstate', onPopstate)

    let flag = false
    await waitForUrlChange(
      function () {
        window.history.back()
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, nextURL)
        expectURLEqual(event.newURL, initURL)
        expect(event.action).to.equal('popstate')
        event.preventDefault()
      }
    )
    expect(flag).to.equal(true)

    // wait the popstate run finish
    await sleep(400)
    await waitForPopstate(function () {
      window.history.back()
    })

    expect(popstateTimes).to.equal(1)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
    window.removeEventListener('popstate', onPopstate)
  })
})

describe('before unload test', function () {
  it('event test', async function () {
    let flag = false
    let notCanceled = false
    await waitForUrlChange(
      function () {
        notCanceled = window.dispatchEvent(
          new Event('beforeunload', { cancelable: true })
        )
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expect(event.newURL).to.equal(null)
        expect(event.action).to.equal('beforeunload')
      }
    )

    expect(flag).to.equal(true)
    expect(notCanceled).to.equal(true)
  })

  it('prevent event test', async function () {
    let flag = false
    let notCanceled = true

    await waitForUrlChange(
      function () {
        notCanceled = window.dispatchEvent(
          new Event('beforeunload', { cancelable: true })
        )
      },
      function (event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expect(event.newURL).to.equal(null)
        expect(event.action).to.equal('beforeunload')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(notCanceled).to.equal(false)
  })
})
