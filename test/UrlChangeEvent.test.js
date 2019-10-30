import UrlChangeEvent from '../src/UrlChangeEvent'

const expect = chai.expect

describe('UrlChangeEvent test', function() {
  it('event struct', function() {
    const oldURL = {}
    const newURL = {}
    const action = {}
    const event = new UrlChangeEvent({
      oldURL,
      newURL,
      action,
    })

    expect(event.oldURL).to.equal(oldURL)
    expect(event.newURL).to.equal(newURL)
    expect(event.action).to.equal(action)
  })

  it('event default cancelable is true', function() {
    const event = new UrlChangeEvent()
    expect(event.cancelable).to.equal(true)
  })

  it('event set cancelable', function() {
    const event = new UrlChangeEvent({ cancelable: false })
    expect(event.cancelable).to.equal(false)
  })
})
