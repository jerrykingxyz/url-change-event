export default class UrlChangeEvent extends Event {
  constructor(option = {}) {
    super('urlchangeevent', option)
    this.newURL = option.newURL
    this.oldURL = option.oldURL
    this.action = option.action
  }

  get [Symbol.toStringTag]() {
    return 'UrlChangeEvent'
  }
}
