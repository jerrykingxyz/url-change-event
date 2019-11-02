// import src/index.js can init brower env
import '../src/index'
import './UrlChangeEvent.test'
import './stateCache.test'
import './override.test'

import { cacheIndex, cachePath } from '../src/stateCache'
import { waitForPopstate } from './utils'

const expect = chai.expect
const initPath = cachePath
const initIndex = cacheIndex

describe('popstate test', function() {
  it('history back test', async function() {
    const nextState = '/nextState'
    window.history.pushState(null, null, nextState)

    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(nextState)
      expect(event.newURL).to.equal(initPath)
      expect(event.action).to.equal('popstate')
    }
    window.addEventListener('urlchangeevent', listener)
    window.history.back()
    await waitForPopstate()
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cachePath).to.equal(initPath)
    expect(cacheIndex).to.equal(initIndex)
  })

  it('history forward test', async function() {
    const nextState = '/nextState'
    window.history.pushState(null, null, nextState)
    window.history.back()
    await waitForPopstate()

    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(nextState)
      expect(event.action).to.equal('popstate')
    }
    window.addEventListener('urlchangeevent', listener)
    window.history.forward()
    await waitForPopstate()
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cachePath).to.equal(nextState)
    expect(cacheIndex).to.equal(initIndex + 1)

    window.history.back()
    await waitForPopstate()
  })

  /*  it('prevent history change test', async function() {
    const nextState = '/nextState'
    window.history.pushState(null, null, nextState)
    window.history.back()
    await waitForPopstate()

    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(nextState)
      expect(event.newURL).to.equal(initPath)
      expect(event.action).to.equal('popstate')
      event.preventDefault()
    }
    const finishPromise = waitForUrlChange(listener)
    window.history.forward()
    await finishPromise

    expect(flag).to.equal(true)
    expect(cachePath).to.equal(initPath)
    expect(cacheIndex).to.equal(initIndex)
  })*/
})

describe('before unload test', function() {
  it('event test', function() {
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal('')
      expect(event.action).to.equal('beforeunload')
    }

    window.addEventListener('urlchangeevent', listener)
    const notCanceled = window.dispatchEvent(
      new Event('beforeunload', { cancelable: true })
    )
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(notCanceled).to.equal(true)
  })

  it('prevent event test', function() {
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal('')
      expect(event.action).to.equal('beforeunload')
      event.preventDefault()
    }

    window.addEventListener('urlchangeevent', listener)
    const notCanceled = window.dispatchEvent(
      new Event('beforeunload', { cancelable: true })
    )
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(notCanceled).to.equal(false)
  })
})
