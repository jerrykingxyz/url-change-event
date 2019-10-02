export default class UrlChangeEvent extends Event {
  constructor(option = {}) {
    super('urlchangeevent', option)
    this.newURL = option.newURL
    this.oldURL = option.oldURL
  }

  get [Symbol.toStringTag]() {
    return 'UrlChangeEvent'
  }
}
