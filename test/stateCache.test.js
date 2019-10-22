import { cacheIndex, cachePath, updateCacheState } from '../src/stateCache.js'

const expect = chai.expect

describe('state cache test', function() {
  beforeEach(function() {
    if (!window.history.state) {
      // init env
      window.history.replaceState({ _index: window.history.length }, null, null)
    }
  })
  it('not init state', function() {
    expect(cacheIndex).to.be.undefined
    expect(cachePath).to.be.undefined
  })

  it('after init state', function() {
    updateCacheState()
    expect(cacheIndex).to.equal(1)
    expect(cachePath).to.equal(window.location.pathname)
  })
})
