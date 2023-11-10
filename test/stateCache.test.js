import { cacheIndex, cacheURL, updateCacheState } from '../src/stateCache'

describe('state cache test', function () {
  it('index & path', function () {
    updateCacheState(window.history.length)
    expect(cacheIndex).to.equal(window.history.length)
    expect(cacheURL.href).to.equal(window.location.href)
  })
})
