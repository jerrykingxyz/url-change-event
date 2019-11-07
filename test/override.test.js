import { cacheIndex, cachePath } from '../src/stateCache'
import { waitForPopstate } from './utils'

const initPath = cachePath
const initIndex = cacheIndex

describe('override push state method test', function() {
  it('absolute path test', async function() {
    const pushPath = '/pushPath'
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(pushPath)
      expect(event.action).to.equal('pushState')
    }
    window.addEventListener('urlchangeevent', listener)
    window.history.pushState(null, null, pushPath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex + 1)
    expect(cachePath).to.equal(pushPath)

    window.history.back()
    await waitForPopstate()

    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('relative path test', async function() {
    const pushPath = 'pushPath'
    const absolutPath = new URL(pushPath, window.location.href).pathname
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(absolutPath)
      expect(event.action).to.equal('pushState')
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.pushState(null, null, pushPath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex + 1)
    expect(cachePath).to.equal(absolutPath)

    window.history.back()
    await waitForPopstate()

    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('prevent absolute path change test', function() {
    const pushPath = '/pushPath'
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(pushPath)
      expect(event.action).to.equal('pushState')
      event.preventDefault()
    }
    window.addEventListener('urlchangeevent', listener)
    window.history.pushState(null, null, pushPath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('prevent relative path change test', async function() {
    const pushPath = 'pushPath'
    const absolutPath = new URL(pushPath, window.location.href).pathname
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(absolutPath)
      expect(event.action).to.equal('pushState')
      event.preventDefault()
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.pushState(null, null, pushPath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })
})

describe('override replace state method test', function() {
  it('absolute path test', function() {
    const replacePath = '/replacePath'
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(replacePath)
      expect(event.action).to.equal('replaceState')
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.replaceState(null, null, replacePath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(replacePath)
    window.history.replaceState(null, null, initPath)

    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('relative path test', async function() {
    const replacePath = 'replacePath'
    const absolutPath = new URL(replacePath, window.location.href).pathname
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(absolutPath)
      expect(event.action).to.equal('replaceState')
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.replaceState(null, null, replacePath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(absolutPath)
    window.history.replaceState(null, null, initPath)

    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('prevent absolute path change test', function() {
    const replacePath = '/replacePath'
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(replacePath)
      expect(event.action).to.equal('replaceState')
      event.preventDefault()
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.replaceState(null, null, replacePath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })

  it('prevent relative path change test', async function() {
    const replacePath = 'replacePath'
    const absolutPath = new URL(replacePath, window.location.href).pathname
    let flag = false
    const listener = function(event) {
      flag = true
      expect(event.oldURL).to.equal(initPath)
      expect(event.newURL).to.equal(absolutPath)
      expect(event.action).to.equal('replaceState')
      event.preventDefault()
    }

    window.addEventListener('urlchangeevent', listener)
    window.history.replaceState(null, null, replacePath)
    window.removeEventListener('urlchangeevent', listener)

    expect(flag).to.equal(true)
    expect(cacheIndex).to.equal(initIndex)
    expect(cachePath).to.equal(initPath)
  })
})
