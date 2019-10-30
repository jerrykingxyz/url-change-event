import { cacheIndex, cachePath, updateCacheState } from '../src/stateCache'

const expect = chai.expect

describe('state cache test', function() {
  it('index & path', function() {
    updateCacheState()
    expect(cacheIndex).to.equal(window.history.length)
    expect(cachePath).to.equal(window.location.pathname)
  })
})
