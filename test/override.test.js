import { originPushState, originReplaceState } from '../src/override'

const expect = chai.expect

const initPath = window.location.pathname

describe('override change state method test', function() {
  afterEach(function() {
    window.history.replaceState(null, null, initPath)
  })

  it('push state test', function() {
    const pushPath = '/test'
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
  })

  it('replace state test', function() {
    const replacePath = '/test'
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
  })

  it('origin push state test', function() {
    const pushPath = '/test'
    let flag = false
    const listener = function() {
      flag = true
    }

    window.addEventListener('urlchangeevent', listener)
    originPushState(null, null, pushPath)
    window.removeEventListener('urlchangeevent', listener)
    expect(flag).to.equal(false)
  })

  it('origin replace state test', function() {
    const replacePath = '/test'
    let flag = false
    const listener = function() {
      flag = true
    }

    window.addEventListener('urlchangeevent', listener)
    originReplaceState(null, null, replacePath)
    window.removeEventListener('urlchangeevent', listener)
    expect(flag).to.equal(false)
  })
})
