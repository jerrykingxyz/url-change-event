import { cacheIndex, cacheURL } from '../src/stateCache'
import { expectURLEqual, waitForUrlChange, waitForPopstate } from './utils'

const initURL = cacheURL
const initIndex = cacheIndex

describe('override push state method test', function() {
  it('absolute path test', async function() {
    const pushPath = '/pushPath'
    const pushURL = new URL(pushPath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.pushState(null, null, pushPath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, pushURL)
        expect(event.action).to.equal('pushState')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex + 1)
    expectURLEqual(cacheURL, pushURL)

    await waitForPopstate(function() {
      window.history.back()
    })

    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('relative path test', async function() {
    const pushPath = 'pushPath'
    const pushURL = new URL(pushPath, window.location.href)
    let flag = false
    await waitForUrlChange(
      function() {
        window.history.pushState(null, null, pushPath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, pushURL)
        expect(event.action).to.equal('pushState')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex + 1)
    expectURLEqual(cacheURL, pushURL)

    await waitForPopstate(function() {
      window.history.back()
    })

    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent absolute path change test', async function() {
    const pushPath = '/pushPath'
    const pushURL = new URL(pushPath, window.location.href)
    let flag = false
    await waitForUrlChange(
      function() {
        window.history.pushState(null, null, pushPath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, pushURL)
        expect(event.action).to.equal('pushState')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent relative path change test', async function() {
    const pushPath = 'pushPath'
    const pushURL = new URL(pushPath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.pushState(null, null, pushPath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, pushURL)
        expect(event.action).to.equal('pushState')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })
})

describe('override replace state method test', function() {
  it('absolute path test', async function() {
    const replacePath = '/replacePath'
    const replaceURL = new URL(replacePath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.replaceState(null, null, replacePath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, replaceURL)
        expect(event.action).to.equal('replaceState')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, replaceURL)

    await waitForUrlChange(function() {
      window.history.replaceState(null, null, initURL.href)
    })

    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('relative path test', async function() {
    const replacePath = 'replacePath'
    const replaceURL = new URL(replacePath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.replaceState(null, null, replacePath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, replaceURL)
        expect(event.action).to.equal('replaceState')
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, replaceURL)

    await waitForUrlChange(function() {
      window.history.replaceState(null, null, initURL.href)
    })

    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent absolute path change test', async function() {
    const replacePath = '/replacePath'
    const replaceURL = new URL(replacePath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.replaceState(null, null, replacePath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, replaceURL)
        expect(event.action).to.equal('replaceState')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })

  it('prevent relative path change test', async function() {
    const replacePath = 'replacePath'
    const replaceURL = new URL(replacePath, window.location.href)
    let flag = false

    await waitForUrlChange(
      function() {
        window.history.replaceState(null, null, replacePath)
      },
      function(event) {
        flag = true
        expectURLEqual(event.oldURL, initURL)
        expectURLEqual(event.newURL, replaceURL)
        expect(event.action).to.equal('replaceState')
        event.preventDefault()
      }
    )

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expectURLEqual(cacheURL, initURL)
  })
})
